import Swal from 'sweetalert2';
import CustomizedTables from '../assets/mui components/Table';
import { useEffect } from 'react';

export default function EmployeeList() {  
  useEffect(() => {
    Swal.showLoading();
    setTimeout(() => {
      Swal.close()
    }, 500);
  }, []);
  return (
    <section>
      <h1 className="text-xl mb-3">Employee List</h1>
      <CustomizedTables />
    </section>
  )
}
