import React, { useState, useEffect } from 'react';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db, auth } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import Layout from '../components/Layout';
import { Paper, Table, TableBody, TableCell, TableHead, TableRow, Button, Dialog, DialogTitle, DialogContent, TextField, DialogActions } from '@mui/material';

const Teachers = () => {
  const [teachers, setTeachers] = useState([]);
  const [open, setOpen] = useState(false);
  const [currentTeacher, setCurrentTeacher] = useState({ name: '', subject: '', email: '' });
  const [isEditing, setIsEditing] = useState(false);

  const teachersCollectionRef = collection(db, 'teachers');

  useEffect(() => {
    const getTeachers = async () => {
      const data = await getDocs(teachersCollectionRef);
      setTeachers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getTeachers();
  }, []);

  const handleClickOpen = (teacher) => {
    if (teacher) {
      setIsEditing(true);
      setCurrentTeacher(teacher);
    } else {
      setIsEditing(false);
      setCurrentTeacher({ name: '', subject: '', email: '' });
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = async () => {
    if (isEditing) {
      const teacherDoc = doc(db, 'teachers', currentTeacher.id);
      const { id, ...teacherData } = currentTeacher;
      await updateDoc(teacherDoc, teacherData);
    } else {
      // Create user in Firebase Auth
      try {
        await createUserWithEmailAndPassword(auth, currentTeacher.email, 'password123'); // Default password
      } catch (error) {
        console.error("Error creating user:", error);
        // Handle error (e.g., show a message to the user)
      }
      await addDoc(teachersCollectionRef, currentTeacher);
    }
    handleClose();
    const data = await getDocs(teachersCollectionRef);
    setTeachers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  const handleDelete = async (id) => {
    const teacherDoc = doc(db, 'teachers', id);
    await deleteDoc(teacherDoc);
    setTeachers(teachers.filter((teacher) => teacher.id !== id));
  };

  return (
    <Layout title="Teachers">
      <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
        <Button variant="contained" onClick={() => handleClickOpen(null)} sx={{ mb: 2, alignSelf: 'flex-start' }}>Add Teacher</Button>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Subject</TableCell>
              <TableCell>Email</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {teachers.map((teacher) => (
              <TableRow key={teacher.id}>
                <TableCell>{teacher.name}</TableCell>
                <TableCell>{teacher.subject}</TableCell>
                <TableCell>{teacher.email}</TableCell>
                <TableCell align="right">
                  <Button onClick={() => handleClickOpen(teacher)} sx={{ mr: 1 }}>Edit</Button>
                  <Button onClick={() => handleDelete(teacher.id)} color="secondary">Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>{isEditing ? 'Edit Teacher' : 'Add Teacher'}</DialogTitle>
          <DialogContent>
            <TextField autoFocus margin="dense" label="Name" type="text" fullWidth value={currentTeacher.name} onChange={(e) => setCurrentTeacher({ ...currentTeacher, name: e.target.value })} />
            <TextField margin="dense" label="Subject" type="text" fullWidth value={currentTeacher.subject} onChange={(e) => setCurrentTeacher({ ...currentTeacher, subject: e.target.value })} />
            <TextField margin="dense" label="Email" type="email" fullWidth value={currentTeacher.email} onChange={(e) => setCurrentTeacher({ ...currentTeacher, email: e.target.value })} />
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

export default Teachers;
