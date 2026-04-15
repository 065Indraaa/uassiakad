import React, { useState, useEffect } from 'react';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { db, auth } from '../firebase';
import Layout from '../components/Layout';
import { Paper, Table, TableBody, TableCell, TableHead, TableRow, Button, Dialog, DialogTitle, DialogContent, TextField, DialogActions } from '@mui/material';

const Students = () => {
  const [students, setStudents] = useState([]);
  const [open, setOpen] = useState(false);
  const [currentStudent, setCurrentStudent] = useState({ name: '', email: '', password: '' });
  const [isEditing, setIsEditing] = useState(false);

  const studentsCollectionRef = collection(db, 'students');

  useEffect(() => {
    const getStudents = async () => {
      const data = await getDocs(studentsCollectionRef);
      setStudents(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getStudents();
  }, [studentsCollectionRef]);

  const handleClickOpen = (student) => {
    if (student) {
      setIsEditing(true);
      setCurrentStudent(student);
    } else {
      setIsEditing(false);
      setCurrentStudent({ name: '', email: '', password: '' });
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = async () => {
    if (isEditing) {
      const studentDoc = doc(db, 'students', currentStudent.id);
      const studentData = { ...currentStudent };
      delete studentData.id;
      await updateDoc(studentDoc, studentData);
    } else {
      await addDoc(studentsCollectionRef, { name: currentStudent.name, email: currentStudent.email });
      await createUserWithEmailAndPassword(auth, currentStudent.email, currentStudent.password);
    }
    handleClose();
    const data = await getDocs(studentsCollectionRef);
    setStudents(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  const handleDelete = async (id) => {
    const studentDoc = doc(db, 'students', id);
    await deleteDoc(studentDoc);
    setStudents(students.filter((student) => student.id !== id));
  };

  return (
    <Layout title="Students">
      <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
        <Button variant="contained" onClick={() => handleClickOpen(null)} sx={{ mb: 2, alignSelf: 'flex-start' }}>Add Student</Button>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {students.map((student) => (
              <TableRow key={student.id}>
                <TableCell>{student.name}</TableCell>
                <TableCell>{student.email}</TableCell>
                <TableCell align="right">
                  <Button onClick={() => handleClickOpen(student)} sx={{ mr: 1 }}>Edit</Button>
                  <Button onClick={() => handleDelete(student.id)} color="secondary">Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>{isEditing ? 'Edit Student' : 'Add Student'}</DialogTitle>
          <DialogContent>
            <TextField autoFocus margin="dense" label="Name" type="text" fullWidth value={currentStudent.name} onChange={(e) => setCurrentStudent({ ...currentStudent, name: e.target.value })} />
            <TextField margin="dense" label="Email Address" type="email" fullWidth value={currentStudent.email} onChange={(e) => setCurrentStudent({ ...currentStudent, email: e.target.value })} />
            {!isEditing && <TextField margin="dense" label="Password" type="password" fullWidth value={currentStudent.password} onChange={(e) => setCurrentStudent({ ...currentStudent, password: e.target.value })} />}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleSave}>Save</Button>
          </DialogActions>
        </Dialog>
      </Paper>
    </Layout>
  );
};

export default Students;
