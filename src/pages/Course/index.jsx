import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import { useTheme } from '../../ThemeContext';
import courseData from '../../data/koreanCoursesData.json';
import { useNavigate } from 'react-router-dom';

const KoreanCoursesPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [levelDropdown, setLevelDropdown] = useState(false);
  const [skillsDropdown, setSkillsDropdown] = useState(false);
  const [formatDropdown, setFormatDropdown] = useState(false);
  const [recommendedDropdown, setRecommendedDropdown] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState('All Levels');
  const [selectedSkill, setSelectedSkill] = useState('All Skills');
  const [selectedFormat, setSelectedFormat] = useState('All Formats');
  const [selectedRecommended, setSelectedRecommended] = useState('Recommended');
  const [showCurriculum, setShowCurriculum] = useState(false);
  
  // Sample course data based on the images
  const courses = courseData.courses;
  const { season } = useTheme();
  const navigate = useNavigate();
  
  // Filter courses based on selected filters
  const filteredCourses = courses.filter(course => {
    const levelMatch = selectedLevel === 'All Levels' || course.level === selectedLevel;
    const skillMatch = selectedSkill === 'All Skills' || course.skill.includes(selectedSkill);
    const formatMatch = selectedFormat === 'All Formats' || 
      (selectedFormat === 'Video' && course.type === 'video') ||
      (selectedFormat === 'Audio' && course.type === 'audio') ||
      (selectedFormat === 'Document' && course.type === 'document');
    
    return levelMatch && skillMatch && formatMatch;
  });
  
  // Display 9 courses per page (3x3 grid)
  const coursesPerPage = 9;
  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = filteredCourses.slice(indexOfFirstCourse, indexOfLastCourse);
  
  // Calculate total pages
  const totalPages = Math.ceil(filteredCourses.length / coursesPerPage);
  
  // Generate pagination numbers
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  // Course curriculum modal content
  const CurriculumModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg max-w-2xl w-full max-h-screen overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Course Curriculum</h2>
          <button 
            onClick={() => setShowCurriculum(false)} 
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>
        <div className="mb-4">
          <h3 className="font-bold mb-2">Beginner Path</h3>
          <ol className="list-decimal pl-5 space-y-1">
            <li>Korean Writing System (Hangul)</li>
            <li>Must-Know Words In Korean</li>
            <li>20 Essential Korean Phrases For Beginners</li>
            <li>Korean Grammar Basics</li>
            <li>Korean Pronunciation Guide</li>
          </ol>
        </div>
        <div className="mb-4">
          <h3 className="font-bold mb-2">Intermediate Path</h3>
          <ol className="list-decimal pl-5 space-y-1">
            <li>REAL Korean Conversations Explained</li>
            <li>My Virtual Korean Friends: Korean Speaking Practice</li>
            <li>TOPIK II Test – Listening & Writing</li>
            <li>TOPIK II Test – Reading</li>
          </ol>
        </div>
        <div>
          <h3 className="font-bold mb-2">Advanced Path</h3>
          <ol className="list-decimal pl-5 space-y-1">
            <li>IYAGI – Listening in 100% Natural Korean</li>
            <li>Business Korean Expressions</li>
          </ol>
        </div>
        <button 
          onClick={() => setShowCurriculum(false)}
          className="mt-6 bg-green-500 text-white px-4 py-2 rounded w-full"
        >
          Close
        </button>
      </div>
    </div>
  );
  
  // Dropdown component
  const Dropdown = ({ isOpen, options, selected, onSelect, onToggle }) => (
    <div className="relative">
      <button 
        onClick={onToggle}
        className="bg-white border border-gray-300 rounded px-4 py-2 flex items-center justify-between min-w-32"
      >
        {selected} <span className="ml-2 text-xs">▼</span>
      </button>
      {isOpen && (
        <div className="absolute top-full left-0 mt-1 bg-white border border-gray-300 rounded shadow-lg z-10 w-full">
          {options.map(option => (
            <button
              key={option}
              onClick={() => {
                onSelect(option);
                onToggle();
              }}
              className={`block w-full text-left px-4 py-2 hover:bg-gray-100 ${selected === option ? 'bg-gray-100' : ''}`}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
  
  // Handle course click
  const handleCourseClick = (courseId) => {
    navigate(`/course/korean-course-detail/`);
  };
  
  return (
    <div className={`${season}-gradient min-h-screen`}>
      <Navbar active="course" />
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">All Courses</h1>
        
        {/* Green banner */}
        <div className="bg-green-500 rounded-lg p-6 mb-8 flex flex-col md:flex-row justify-between items-center">
          <h2 className="text-white text-xl font-semibold flex items-center mb-4 md:mb-0">
            <span className="mr-2 text-3xl">👀</span> Where should I start?
          </h2>
          <button 
            className="bg-gray-900 text-white px-4 py-2 rounded font-medium hover:bg-gray-800 transition-colors"
            onClick={() => setShowCurriculum(true)}
          >
            Click Here for Course Curriculum
          </button>
        </div>
        
        {/* Filters */}
        <div className="flex flex-wrap gap-3 justify-between mb-6">
          <div className="flex flex-wrap gap-3">
            <Dropdown
              isOpen={levelDropdown}
              options={['All Levels', 'Beginner', 'Intermediate', 'Advanced']}
              selected={selectedLevel}
              onSelect={setSelectedLevel}
              onToggle={() => setLevelDropdown(!levelDropdown)}
            />
            
            <Dropdown
              isOpen={skillsDropdown}
              options={['All Skills', 'Listening', 'Speaking', 'Reading', 'Writing', 'Vocabulary', 'Grammar', 'Pronunciation']}
              selected={selectedSkill}
              onSelect={setSelectedSkill}
              onToggle={() => setSkillsDropdown(!skillsDropdown)}
            />
            
            <Dropdown
              isOpen={formatDropdown}
              options={['All Formats', 'Video', 'Audio', 'Document']}
              selected={selectedFormat}
              onSelect={setSelectedFormat}
              onToggle={() => setFormatDropdown(!formatDropdown)}
            />
          </div>
          
          <Dropdown
            isOpen={recommendedDropdown}
            options={['Recommended', 'Newest', 'Most Popular', 'Alphabetical']}
            selected={selectedRecommended}
            onSelect={setSelectedRecommended}
            onToggle={() => setRecommendedDropdown(!recommendedDropdown)}
          />
        </div>
        
        {/* Course grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentCourses.length > 0 ? (
            currentCourses.map(course => (
              <div 
                key={course.id} 
                className="bg-white rounded-lg overflow-hidden shadow hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => handleCourseClick(course.id)}
              >
                <div className="relative h-48 bg-gray-200">
                  <img src={course.image} alt={course.title} className="w-full h-full object-cover" />
                  {course.isNew && (
                    <div className="absolute bottom-3 right-3 bg-black text-white px-3 py-1 rounded-full text-sm font-bold">
                      NEW
                    </div>
                  )}
                  {course.isBest && (
                    <div className="absolute bottom-3 right-3 bg-white text-black px-3 py-1 rounded-full text-sm font-bold">
                      BEST
                    </div>
                  )}
                </div>
                <div className="p-5">
                  <h3 className="text-gray-800 font-semibold mb-10">{course.title}</h3>
                  <div className="flex items-center text-gray-500 text-sm">
                    {course.type === 'video' && (
                      <div className="flex items-center mr-4">
                        <span className="mr-1">🎬</span> video
                      </div>
                    )}
                    {course.type === 'audio' && (
                      <div className="flex items-center mr-4">
                        <span className="mr-1">🎧</span> audio
                      </div>
                    )}
                    {course.type === 'document' && (
                      <div className="flex items-center mr-4">
                        <span className="mr-1">📄</span>
                      </div>
                    )}
                    <div className="flex items-center">
                      <span className="mr-1">📝</span> {course.count}
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-3 py-10 text-center text-gray-500">
              No courses match your filter criteria. Try adjusting your filters.
            </div>
          )}
        </div>
        
        {/* Pagination */}
        {filteredCourses.length > 0 && (
          <div className="flex justify-center mt-8">
            <div className="flex flex-wrap">
              {currentPage > 1 && (
                <button
                  onClick={() => setCurrentPage(currentPage - 1)}
                  className="w-10 h-10 flex items-center justify-center mx-1 rounded bg-white text-gray-700 border border-gray-300 hover:bg-gray-100"
                >
                  ←
                </button>
              )}
              
              {pageNumbers.map(number => (
                <button
                  key={number}
                  onClick={() => setCurrentPage(number)}
                  className={`w-10 h-10 flex items-center justify-center mx-1 rounded ${
                    currentPage === number 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-100'
                  }`}
                >
                  {number}
                </button>
              ))}
              
              {currentPage < totalPages && (
                <button
                  onClick={() => setCurrentPage(currentPage + 1)}
                  className="w-10 h-10 flex items-center justify-center mx-1 rounded bg-white text-gray-700 border border-gray-300 hover:bg-gray-100"
                >
                  →
                </button>
              )}
              
              {currentPage < totalPages - 1 && (
                <button
                  onClick={() => setCurrentPage(totalPages)}
                  className="w-10 h-10 flex items-center justify-center mx-1 rounded bg-white text-gray-700 border border-gray-300 hover:bg-gray-100"
                >
                  »
                </button>
              )}
            </div>
          </div>
        )}
      </div>
      
      {/* Curriculum Modal */}
      {showCurriculum && <CurriculumModal />}
    </div>
  );
};

export default KoreanCoursesPage;