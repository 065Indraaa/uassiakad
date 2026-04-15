import React, { useState, useEffect } from 'react';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';
import Layout from '../components/Layout';
import { Paper, Table, TableBody, TableCell, TableHead, TableRow, Button, Dialog, DialogTitle, DialogContent, TextField, DialogActions, Select, MenuItem, FormControl, InputLabel } from '@mui/material';

const Grades = () => {
  const [grades, setGrades] = useState([]);
  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [open, setOpen] = useState(false);
  const [currentGrade, setCurrentGrade] = useState({ studentId: '', teacherId: '', subject: '', grade: '' });
  const [isEditing, setIsEditing] = useState(false);

  const gradesCollectionRef = collection(db, 'grades');
  const studentsCollectionRef = collection(db, 'students');
  const teachersCollectionRef = collection(db, 'teachers');

  useEffect(() => {
    const getGrades = async () => {
      const data = await getDocs(gradesCollectionRef);
      setGrades(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    const getStudents = async () => {
      const data = await getDocs(studentsCollectionRef);
      setStudents(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    const getTeachers = async () => {
      const data = await getDocs(teachersCollectionRef);
      setTeachers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getGrades();
    getStudents();
    getTeachers();
  }, [gradesCollectionRef, studentsCollectionRef, teachersCollectionRef]);

  const handleClickOpen = (grade) => {
    if (grade) {
      setIsEditing(true);
      setCurrentGrade(grade);
    } else {
      setIsEditing(false);
      setCurrentGrade({ studentId: '', teacherId: '', subject: '', grade: '' });
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = async () => {
    if (isEditing) {
      const gradeDoc = doc(db, 'grades', currentGrade.id);
      const gradeData = { ...currentGrade };
      delete gradeData.id;
      await updateDoc(gradeDoc, gradeData);
    } else {
      await addDoc(gradesCollectionRef, currentGrade);
    }
    handleClose();
    const data = await getDocs(gradesCollectionRef);
    setGrades(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  const handleDelete = async (id) => {
    const gradeDoc = doc(db, 'grades', id);
    await deleteDoc(gradeDoc);
    setGrades(grades.filter((grade) => grade.id !== id));
  };
  
  const getStudentName = (studentId) => {
    const student = students.find((s) => s.id === studentId);
    return student ? student.name : 'Unknown Student';
  };

  const getTeacherName = (teacherId) => {
    const teacher = teachers.find((t) => t.id === teacherId);
    return teacher ? teacher.name : 'Unknown Teacher';
  };

  return (
    <Layout title="Grades">
      <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
        <Button variant="contained" onClick={() => handleClickOpen(null)} sx={{ mb: 2, alignSelf: 'flex-start' }}>Add Grade</Button>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Student</TableCell>
              <TableCell>Teacher</TableCell>
              <TableCell>Subject</TableCell>
              <TableCell>Grade</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {grades.map((grade) => (
              <TableRow key={grade.id}>
                <TableCell>{getStudentName(grade.studentId)}</TableCell>
                <TableCell>{getTeacherName(grade.teacherId)}</TableCell>
                <TableCell>{grade.subject}</TableCell>
                <TableCell>{grade.grade}</TableCell>
                <TableCell align="right">
                  <Button onClick={() => handleClickOpen(grade)} sx={{ mr: 1 }}>Edit</Button>
                  <Button onClick={() => handleDelete(grade.id)} color="secondary">Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>{isEditing ? 'Edit Grade' : 'Add Grade'}</DialogTitle>
          <DialogContent>
            <FormControl fullWidth margin="dense">
              <InputLabel>Student</InputLabel>
              <Select value={currentGrade.studentId} onChange={(e) => setCurrentGrade({ ...currentGrade, studentId: e.target.value })} label="Student">
                {students.map((student) => (
                  <MenuItem key={student.id} value={student.id}>{student.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth margin="dense">
              <InputLabel>Teacher</InputLabel>
              <Select value={currentGrade.teacherId} onChange={(e) => setCurrentGrade({ ...currentGrade, teacherId: e.target.value })} label="Teacher">
                {teachers.map((teacher) => (
                  <MenuItem key={teacher.id} value={teacher.id}>{teacher.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField margin="dense" label="Subject" type="text" fullWidth value={currentGrade.subject} onChange={(e) => setCurrentGrade({ ...currentGrade, subject: e.target.value })} />
            <TextField margin="dense" label="Grade" type="text" fullWidth value={currentGrade.grade} onChange={(e) => setCurrentGrade({ ...currentGrade, grade: e.target.value })} />
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

export default Grades;
