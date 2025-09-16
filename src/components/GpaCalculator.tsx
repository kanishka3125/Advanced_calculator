import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, Book, Award, Star } from 'lucide-react';
import { Theme } from '../types';

interface GpaCalculatorProps {
  theme: Theme;
  onCalculation: (calculation: string, result: string) => void;
}

interface Course {
  id: number;
  name: string;
  credits: string;
  grade: string;
}

const gradePoints: Record<string, number> = {
  'O': 10.0, 'A+': 9.0, 'A': 8.0, 'B+': 7.0, 'B': 6.0,
  'C+': 5.0, 'C': 4.0, 'D+': 3.0, 'D': 2.0, 'E+': 1.0,
  'E': 0.0, 'F+': 0.0, 'F': 0.0,
};

const GpaCalculator: React.FC<GpaCalculatorProps> = ({ theme, onCalculation }) => {
  const [mode, setMode] = useState<'gpa' | 'cgpa'>('gpa');
  const [courses, setCourses] = useState<Course[]>([]);
  const [newCourse, setNewCourse] = useState({ name: '', credits: '', grade: 'O' });
  
  const [semesterGpa, setSemesterGpa] = useState(0);
  const [totalSemesterCredits, setTotalSemesterCredits] = useState(0);
  const [totalQualityPoints, setTotalQualityPoints] = useState(0);

  const [projectedCgpa, setProjectedCgpa] = useState(0);
  const [currentCgpa, setCurrentCgpa] = useState('');
  const [previousCredits, setPreviousCredits] = useState('');

  useEffect(() => {
    const qualityPoints = courses.reduce((sum, course) => {
      const credits = parseFloat(course.credits) || 0;
      const points = gradePoints[course.grade] || 0;
      return sum + (credits * points);
    }, 0);
    setTotalQualityPoints(qualityPoints);

    const creditsThisSemester = courses.reduce((sum, course) => sum + (parseFloat(course.credits) || 0), 0);
    setTotalSemesterCredits(creditsThisSemester);

    const gpa = creditsThisSemester > 0 ? qualityPoints / creditsThisSemester : 0;
    setSemesterGpa(gpa);

    if (mode === 'cgpa') {
      const oldCgpa = parseFloat(currentCgpa) || 0;
      const oldCredits = parseFloat(previousCredits) || 0;
      
      const newTotalPoints = (oldCgpa * oldCredits) + qualityPoints;
      const newTotalCredits = oldCredits + creditsThisSemester;

      setProjectedCgpa(newTotalCredits > 0 ? newTotalPoints / newTotalCredits : 0);
    }
  }, [courses, currentCgpa, previousCredits, mode]);

  const addCourse = () => {
    if (newCourse.credits && parseFloat(newCourse.credits) > 0) {
      const courseToAdd: Course = { ...newCourse, id: Date.now() };
      setCourses([...courses, courseToAdd]);
      setNewCourse({ name: '', credits: '', grade: 'O' });
      onCalculation(
        `Added Course: ${courseToAdd.credits} credits, Grade ${courseToAdd.grade}`,
        `Current Semester GPA: ${semesterGpa.toFixed(3)}`
      );
    }
  };

  const removeCourse = (id: number) => {
    setCourses(courses.filter(course => course.id !== id));
  };

  const clearAll = () => {
    setCourses([]);
    setNewCourse({ name: '', credits: '', grade: 'O' });
    setCurrentCgpa('');
    setPreviousCredits('');
  };

  return (
    <motion.div
      className={`p-6 rounded-3xl ${theme.card} ${theme.shadow} border ${theme.border} w-full max-w-2xl`}
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex justify-center gap-2 mb-6">
        {['gpa', 'cgpa'].map((m) => (
          <motion.button
            key={m}
            onClick={() => setMode(m as 'gpa' | 'cgpa')}
            className={`px-6 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${mode === m ? theme.buttonOperator : theme.button}`}
          >
            {m.toUpperCase()} Calculator
          </motion.button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={mode}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
        >
          {mode === 'cgpa' && (
            <div className={`grid grid-cols-2 gap-4 mb-4 p-4 rounded-xl ${theme.display} border ${theme.border}`}>
              <input type="number" placeholder="Current CGPA" value={currentCgpa} onChange={(e) => setCurrentCgpa(e.target.value)} className={`p-3 rounded-xl ${theme.button} ${theme.text} border ${theme.border} outline-none`} />
              <input type="number" placeholder="Previous Credits" value={previousCredits} onChange={(e) => setPreviousCredits(e.target.value)} className={`p-3 rounded-xl ${theme.button} ${theme.text} border ${theme.border} outline-none`} />
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      <div className={`grid ${mode === 'gpa' ? 'grid-cols-1' : 'grid-cols-2'} gap-4 mb-6`}>
        <div className={`p-4 rounded-xl ${theme.display} border ${theme.border} text-center`}>
          <div className={`text-sm ${theme.textSecondary}`}>Semester GPA</div>
          <div className={`text-4xl font-bold ${theme.accent}`}>
            {semesterGpa.toFixed(3)}
          </div>
        </div>
        {mode === 'cgpa' && (
          <div className={`p-4 rounded-xl ${theme.display} border ${theme.border} text-center`}>
            <div className={`text-sm ${theme.textSecondary}`}>Projected CGPA</div>
            <div className={`text-4xl font-bold ${theme.accent}`}>
              {projectedCgpa.toFixed(3)}
            </div>
          </div>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-12 gap-2 mb-4">
        <input type="text" placeholder="Course Name (Optional)" value={newCourse.name} onChange={(e) => setNewCourse({ ...newCourse, name: e.target.value })} className={`md:col-span-4 p-3 rounded-xl ${theme.button} ${theme.text} border ${theme.border} outline-none`} />
        <input type="number" placeholder="Credits" value={newCourse.credits} onChange={(e) => setNewCourse({ ...newCourse, credits: e.target.value })} className={`md:col-span-2 p-3 rounded-xl ${theme.button} ${theme.text} border ${theme.border} outline-none`} />
        <select value={newCourse.grade} onChange={(e) => setNewCourse({ ...newCourse, grade: e.target.value })} className={`md:col-span-3 p-3 rounded-xl ${theme.button} ${theme.text} border ${theme.border} outline-none`}>
          {Object.keys(gradePoints).map(grade => <option key={grade} value={grade} className={theme.background}>{grade}</option>)}
        </select>
        <motion.button onClick={addCourse} className={`md:col-span-3 p-3 rounded-xl ${theme.buttonOperator} flex items-center justify-center gap-2`} whileTap={{ scale: 0.95 }}>
          <Plus size={18} /> Add
        </motion.button>
      </div>

      <div className="space-y-2 max-h-48 overflow-y-auto pr-2 mb-4">
        <AnimatePresence>
          {courses.map(course => (
            <motion.div
              key={course.id}
              layout
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className={`flex items-center justify-between p-3 rounded-lg ${theme.button}`}
            >
              <div className="flex-1">
                <p className={`font-semibold text-sm ${theme.text}`}>{course.name || `Course ${courses.length - courses.indexOf(course)}`}</p>
                <p className={`text-xs ${theme.textSecondary}`}>{course.credits} Credits • Grade: {course.grade}</p>
              </div>
              <motion.button onClick={() => removeCourse(course.id)} className={`p-2 rounded-full ${theme.buttonSpecialHover}`} whileTap={{ scale: 0.9 }}>
                <Trash2 size={16} />
              </motion.button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      
      <div className="grid grid-cols-3 gap-2">
        <div className={`p-2 rounded-lg ${theme.display} border ${theme.border} text-center`}>
            <div className={`text-xs ${theme.textSecondary}`}>Total Courses</div>
            <div className={`text-lg font-semibold ${theme.text}`}>{courses.length}</div>
        </div>
        <div className={`p-2 rounded-lg ${theme.display} border ${theme.border} text-center`}>
            <div className={`text-xs ${theme.textSecondary}`}>Semester Credits</div>
            <div className={`text-lg font-semibold ${theme.text}`}>{totalSemesterCredits}</div>
        </div>
        <div className={`p-2 rounded-lg ${theme.display} border ${theme.border} text-center`}>
            <div className={`text-xs ${theme.textSecondary}`}>Quality Points</div>
            <div className={`text-lg font-semibold ${theme.text}`}>{totalQualityPoints.toFixed(2)}</div>
        </div>
      </div>

      {courses.length > 0 && (
        <motion.button onClick={clearAll} className={`w-full mt-4 p-2 rounded-lg ${theme.buttonSpecial} text-sm flex items-center justify-center gap-2`} whileTap={{ scale: 0.98 }}>
          <Trash2 size={16} /> Clear All Courses
        </motion.button>
      )}
    </motion.div>
  );
};

export default GpaCalculator;
