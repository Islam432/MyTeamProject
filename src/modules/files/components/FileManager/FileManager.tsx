import {
  FileManagerComponent,
  Inject,
  NavigationPane,
  DetailsView,
  Toolbar,
  BeforeImageLoadEventArgs,
  BeforeDownloadEventArgs,
} from '@syncfusion/ej2-react-filemanager'
import { BeforeSendEventArgs } from '@syncfusion/ej2-react-filemanager'
import Cookies from 'js-cookie'
import './FileManager.scss'

const apiUrl = import.meta.env.VITE_API_URL as string
const hostUrl = `${apiUrl}/files`
const token = Cookies.get('token')!

function beforeSend(args: BeforeSendEventArgs) {
  if (args.ajaxSettings) {
    ;(
      args.ajaxSettings as {
        beforeSend: (args: { httpRequest: { setRequestHeader: (key: string, val: string) => void } }) => void
      }
    ).beforeSend = (args) => {
      args.httpRequest.setRequestHeader('Authorization', token)
    }
  }
}

function beforeImageLoad(args: BeforeImageLoadEventArgs) {
  args.imageUrl = args.imageUrl! + '&Authorization=' + token
}

function beforeDownload(args: BeforeDownloadEventArgs) {
  if (args.data) {
    ;(args.data as { Authorization: string })['Authorization'] = token
  }
}

export default function FileManager() {
  return (
    <FileManagerComponent
      id='file'
      ajaxSettings={{
        url: hostUrl,
        downloadUrl: hostUrl + '/Download',
        uploadUrl: hostUrl + '/Upload',
        getImageUrl: hostUrl + '/GetImage',
      }}
      beforeSend={beforeSend}
      beforeImageLoad={beforeImageLoad}
      beforeDownload={beforeDownload}
    >
      <Inject services={[NavigationPane, DetailsView, Toolbar]} />
    </FileManagerComponent>
  )
}
