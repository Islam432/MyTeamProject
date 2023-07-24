import { memo, useState } from 'react'
import { toggler } from '../class.service';


function ClassesPage() {
  const [isActive, setIsActive] = useState(false);

  const handler = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setIsActive(!isActive);
    await toggler({ open_for_enrollment: isActive }, 4);  
  };

  return (
    <>
      <h1>Courses</h1>
      <button onClick={handler} >
        {isActive ? 'Active' : 'In-Active'}
      </button>
    </>
  );
}

export default memo(ClassesPage);
