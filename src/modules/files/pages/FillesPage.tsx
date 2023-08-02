import FileManager from '../components/FileManager/FileManager'
import { memo } from 'react'
export default memo(function FilesPage() {
  return (
    <div style={{ padding: '1.5rem' }}>
      <FileManager />
    </div>
  )
})
