import React, { useState, useEffect } from 'react';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db, auth } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import Layout from '../components/Layout';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Dialog, DialogTitle, DialogContent, TextField, DialogActions } from '@mui/material';

const Students = () => {
  const [students, setStudents] = useState([]);
  const [open, setOpen] = useState(false);
  const [currentStudent, setCurrentStudent] = useState({ name: '', grade: '', email: '' });
  const [isEditing, setIsEditing] = useState(false);

  const studentsCollectionRef = collection(db, 'students');

  useEffect(() => {
    const getStudents = async () => {
      const data = await getDocs(studentsCollectionRef);
      setStudents(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getStudents();
  }, []);

  const handleClickOpen = (student) => {
    if (student) {
      setIsEditing(true);
      setCurrentStudent(student);
    } else {
      setIsEditing(false);
      setCurrentStudent({ name: '', grade: '', email: '' });
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = async () => {
    if (isEditing) {
      const studentDoc = doc(db, 'students', currentStudent.id);
      const { id, ...studentData } = currentStudent;
      await updateDoc(studentDoc, studentData);
    } else {
      // Create user in Firebase Auth
      try {
        await createUserWithEmailAndPassword(auth, currentStudent.email, 'password123'); // Default password
      } catch (error) {
        console.error("Error creating user:", error);
        // Handle error (e.g., show a message to the user)
      }
      await addDoc(studentsCollectionRef, currentStudent);
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
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Grade</TableCell>
                <TableCell>Email</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {students.map((student) => (
                <TableRow key={student.id}>
                  <TableCell>{student.name}</TableCell>
                  <TableCell>{student.grade}</TableCell>
                  <TableCell>{student.email}</TableCell>
                  <TableCell align="right">
                    <Button onClick={() => handleClickOpen(student)} sx={{ mr: 1 }}>Edit</Button>
                    <Button onClick={() => handleDelete(student.id)} color="secondary">Delete</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>{isEditing ? 'Edit Student' : 'Add Student'}</DialogTitle>
          <DialogContent>
            <TextField autoFocus margin="dense" label="Name" type="text" fullWidth value={currentStudent.name} onChange={(e) => setCurrentStudent({ ...currentStudent, name: e.target.value })} />
            <TextField margin="dense" label="Grade" type="text" fullWidth value={currentStudent.grade} onChange={(e) => setCurrentStudent({ ...currentStudent, grade: e.target.value })} />
            <TextField margin="dense" label="Email" type="email" fullWidth value={currentStudent.email} onChange={(e) => setCurrentStudent({ ...currentStudent, email: e.target.value })} />
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
