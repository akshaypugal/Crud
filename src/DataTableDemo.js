import React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import 'primereact/resources/themes/md-dark-deeppurple/theme.css';

import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { useState } from 'react';
import { InputText } from 'primereact/inputtext';



function DataTableDemo() {
  const [data , setData] = useState([
    {id:1 ,  Name: 'Alice', Age: 25, City: 'New York' },
    {id:2 , Name: 'Bob', Age: 30, City: 'San Francisco' },
    {id:3 , Name: 'Charlie', Age: 22, City: 'Los Angeles' },
    {id:4 , Name: 'David', Age: 35, City: 'Chicago' },
    {id:5 , Name: 'Jean', Age: 30, City: 'Berlin' },
    {id:6 , Name: 'Walter', Age: 47, City: 'Canda' },
    {id:7 , Name: 'Varun', Age: 48, City: 'Newra' },
  ]);
  const deleteRow = (rowData) => {
 
    const updatedData = data.filter((item) => item.id !== rowData.id);

   
    setData(updatedData);
  };

  const actionTemplate = (rowData) => {
    return (
      <Button
        icon="pi pi-trash"
        onClick={() => deleteRow(rowData)}
        className="p-button-danger p-button-rounded p-button-text"
      />
    );
  };

  const[visible, setVisible] = useState(false);
  const[formdata , setFormData] = useState({Name:'', Age:'' ,City:''});
  const [nameError, setNameError] = useState('');
  const [ageError, setAgeError] = useState('');
  const showDialog =() => {
    setVisible(true);
  };


  const hideDialog =() =>{
     setVisible(false);
     setFormData({Name:'', Age:'' , City:''});
     setNameError('');
     setAgeError('');
  };

  const saveData =() =>{
    const id = Math.max(...data.map((item) => item.id),0) +1;
    const newData = { id, ...formdata};
    setData([...data , newData]);
    hideDialog();
    if (formdata.Name.trim() === '') {
      setNameError('Name is required.');
      return; 
    }
    if (!formdata.Age || isNaN(formdata.Age) || formdata.Age <= 0) {
      setAgeError('Age must be a positive number.');
      return; 

    }
    if (formdata.Name.trim() === '' || isNaN(formdata.Age) || formdata.Age <= 0) {
      alert('Please fill in all required fields.'); 
      return; 
    }
  }


  return (
    <div>
    <DataTable value={data} showGridlines tableStyle={{ minWidth: '40rem' }}>
          <Column field="Name" header="Name" />
          <Column field="Age" header="Age" />
          <Column field="City" header="City" />
      </DataTable><Button label='Add Data' icon="pi pi-plus" onClick={showDialog} />
      <Dialog  style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} modal className="p-fluid" visible={visible} onHide={hideDialog}>
        <h2>Add New Data</h2>
        <div className='field'>
          <label htmlFor="name">Name:</label>
          <InputText
            
            id="name"
            value={formdata.Name}
            onChange={(e) => setFormData({ ...formdata, Name: e.target.value })}
          />
          <div className="p-error">{nameError}</div>
        </div>
        <br></br>
        <div className='field'>
          <label htmlFor="age">Age:</label>
          <InputText
            
            id="age"
            value={formdata.Age}
            onChange={(e) => setFormData({ ...formdata, Age: e.target.value })}
          />
        </div>
        <br></br>
        <div className='field'>
          <label htmlFor="city">City:</label>
          <InputText
            
            id="city"
            value={formdata.City}
            onChange={(e) => setFormData({ ...formdata, City: e.target.value })}
          required='true'/>
        </div>
        <br></br>
      
        <Button label="Save" onClick={saveData} />
        <Button label="Cancel" onClick={hideDialog} className="p-button-secondary" />
        <div>
      <DataTable value={data}>
        <Column field="id" header="ID" />
        <Column field="Name" header="Name" />
        <Column field="Age" header="Age" />
        <Column field="City" header="City" />
        <Column body={actionTemplate} />
      </DataTable>
    </div>
      </Dialog>
      </div>
  );
}



export default DataTableDemo;
