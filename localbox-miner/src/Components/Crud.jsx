import React, { useEffect, useState } from 'react';
import './Crud.css';

export default function Crud() {
    const [ernum, setErnum] = useState("");
    const [name, setName] = useState("");
    const [field, setField] = useState("");
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [purchase, setPurchase] = useState(""); 
    const [returntime, setReturntime] = useState(""); 
    const [editIndex, setEditIndex] = useState(null);
    const [data, setData] = useState([]);

    useEffect(() => {
        let existingData = JSON.parse(localStorage.getItem("Students")) || [];
        setData(existingData);
    }, []);

    const handleSubmit = () => {
        let obj = {
            ernum,
            name,
            field, 
            title,
            author,
            purchase,
            returntime
        };

        if (editIndex !== null) {
            let updatedData = [...data];
            updatedData[editIndex] = obj;
            setData(updatedData);
            localStorage.setItem("Students", JSON.stringify(updatedData));
            setEditIndex(null);
        } else {
            const newData = [...data, obj];
            setData(newData);
            localStorage.setItem("Students", JSON.stringify(newData));
        }

        setErnum("");
        setName("");
        setField("");
        setTitle("");
        setAuthor("");
        setPurchase("");
        setReturntime("");
    };

    const handleClear = () => {
        setErnum("");
        setName("");
        setField(""); 
        setTitle("");
        setAuthor("");
        setPurchase("");
        setReturntime("");
        setEditIndex(null); 
    };

    const handleDelete = (index) => {
        const remainingData = data.filter((_, i) => i !== index);
        setData(remainingData);
        localStorage.setItem("Students", JSON.stringify(remainingData));
    };

    const handleEdit = (index) => {
        const singleData = data[index];
        setErnum(singleData.ernum);
        setName(singleData.name);
        setField(singleData.field); 
        setTitle(singleData.title);
        setAuthor(singleData.author);
        setPurchase(singleData.purchase); 
        setReturntime(singleData.returntime); 
        setEditIndex(index);
    };

    return (
        <div>
            <h1>Library Management System</h1>
            <input type="text" placeholder="Enrollment Number" value={ernum} onChange={(e) => setErnum(e.target.value)} /> <br /> <br />
            <input type="text" placeholder="Enter Student Name" value={name} onChange={(e) => setName(e.target.value)} /> <br /> <br />
            <input type="text" placeholder="Enter Student Field" value={field} onChange={(e) => setField(e.target.value)} /> <br /> <br />
            <input type="text" placeholder="Enter Book Title" value={title} onChange={(e) => setTitle(e.target.value)} /> <br /> <br />
            <input type="text" placeholder="Enter Book Author Name" value={author} onChange={(e) => setAuthor(e.target.value)} /> <br /> <br />
            <label> Book Purchase Date</label>
            <input type="date" placeholder="Enter Book Purchase Date" value={purchase} onChange={(e) => setPurchase(e.target.value)} /> <br /> <br />
            <label> Book Return Date</label>  
            <input type="date" placeholder="Enter Book Return Date" value={returntime} onChange={(e) => setReturntime(e.target.value)} /> <br /> <br />
            
            <button id='submit-btn' onClick={handleSubmit}>
                {editIndex !== null ? "Update" : "Submit"}
            </button> 
            
            <button onClick={handleClear} style={{ marginLeft: '10px' }}>
                Clear
            </button> 
            <br /><br />

            <div className="row justify-content-center">
                <table border="1" width="80%">
                    <thead>
                        <tr>
                            <th style={{ textAlign: 'center' }}>Enrollment Number</th>
                            <th style={{ textAlign: 'center' }}>Student Name</th>
                            <th style={{ textAlign: 'center' }}>Field</th>
                            <th style={{ textAlign: 'center' }}>Book Title</th>
                            <th style={{ textAlign: 'center' }}>Author Name</th>
                            <th style={{ textAlign: 'center' }}>Purchase Date</th>
                            <th style={{ textAlign: 'center' }}>Return Date</th>
                            <th style={{ textAlign: 'center' }} colSpan={2}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.length > 0 ? (
                            data.map((e, i) => (
                                <tr key={i}>
                                    <td>{e.ernum}</td>
                                    <td>{e.name}</td>
                                    <td>{e.field}</td> 
                                    <td>{e.title}</td>
                                    <td>{e.author}</td>
                                    <td>{e.purchase}</td>
                                    <td>{e.returntime}</td>
                                    <td>
                                        <button onClick={() => handleEdit(i)}>Edit</button>
                                    </td>
                                    <td>
                                        <button onClick={() => handleDelete(i)} style={{ backgroundColor: 'red' }}>Delete</button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={8}>No Data Found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
