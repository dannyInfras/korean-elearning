import React from "react";
import { useTheme } from "../../ThemeContext";
import courseDetails from "../../data/courseDetails.json";

const KoreanCourseDetailPage = () => {
    const { season } = useTheme();
    const courseDetail = courseDetails.koreanCourse;

  return (
    <div className={`${season}-gradient min-h-screen`}>
      {/* Header section with subscription info */}
      <div className="max-w-4xl mx-auto pt-10 px-4">
        <div className="bg-white rounded-lg shadow-sm p-8 mb-6 text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-navy-900 w-16 h-16 rounded-full flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-white"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
            </div>
          </div>

          <h1 className="text-3xl font-bold text-navy-900 mb-8">
            {courseDetail.title}
          </h1>
          <p className="text-gray-700 mb-4">
            {courseDetail.description}
          </p>

          {/* Pricing options */}
          <div className="bg-blue-50 p-6 rounded-lg">
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <div className="bg-white p-4 rounded-lg flex items-center justify-center min-w-44">
                <span className="text-xl font-bold">{courseDetail.price}</span>
              </div>
              <div className="bg-navy-900 text-white p-4 rounded-lg flex items-center justify-center min-w-72">
                <span className="text-xl">
                  <span className="line-through">{courseDetail.discountedPrice}</span>{" "}
                  <span className="font-bold">{courseDetail.discount}</span> (Save {courseDetail.savings}!)
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* About section */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <h1 className="text-2xl font-bold text-navy-900 mb-6">
            {courseDetail.aboutTitle}
          </h1>

          <h2 className="text-2xl font-bold text-blue-800 mb-4">
            {courseDetail.aboutSubtitle}
          </h2>
          <p className="mb-4">
            {courseDetail.aboutDescription}
          </p>
          <p className="mb-6">
            {courseDetail.aboutDescription2}
          </p>

          <h2 className="text-2xl font-bold text-blue-800 mb-4">
            {courseDetail.targetLevelTitle}
          </h2>
          <p className="mb-6">{courseDetail.targetLevelDescription}</p>

          <h2 className="text-2xl font-bold text-blue-800 mb-4">
            {courseDetail.achieveTitle}
          </h2>
          <ul className="space-y-3 mb-8">
            {courseDetail.achieveList.map((item, index) => (
              <li key={index} className="flex items-start">
                <span className="text-lg mr-2">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Course content */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <h2 className="text-2xl font-bold text-blue-800 mb-6">
            {courseDetail.courseContentTitle}
          </h2>
          <ul className="space-y-3 mb-8">
            {courseDetail.courseContentList.map((item, index) => (
              <li key={index} className="flex items-start">
                <span className="text-lg mr-2">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>

          {/* Table of contents */}
          <div className="border rounded-lg p-6 mb-8">
            <h3 className="text-2xl font-bold text-blue-800 mb-6">
              {courseDetail.tableOfContentsTitle}
            </h3>

            <div className="space-y-4">
              {courseDetail.tableOfContentsList.map((lesson, index) => (
                <div key={index} className="flex border-b pb-4">
                  <div className="w-20 font-bold">Lesson {lesson.num}.</div>
                  <div>{lesson.title}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Reviews section */}
          <div className="mb-4 flex items-center">
            <h2 className="text-2xl font-bold text-navy-900">{courseDetail.reviewsTitle}</h2>
            <div className="ml-2 bg-blue-800 text-white p-1 rounded">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
              </svg>
            </div>
          </div>

          {/* Review input */}
          <div className="flex mb-8">
            <input
              type="text"
              placeholder={courseDetail.reviewPlaceholder}
              className="flex-grow p-4 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="bg-blue-200 text-blue-600 px-6 py-4 rounded-r-lg font-medium">
              {courseDetail.postButton}
            </button>
          </div>

          {/* Reviews */}
          {/* 
            This section displays a list of reviews from users who have taken the course.
            Each review includes the user's initials, name, and the date they left the review.
          */}
          <div className="flex flex-col gap-4 mb-8">
            {courseDetail.reviews.map((review, index) => (
              <div key={index} className="flex flex-col gap-2">
                <div className="flex items-center gap-3">
                  <div className="bg-blue-800 text-white w-10 h-10 rounded-lg flex items-center justify-center font-bold">
                    {review.initials}
                  </div>
                  <div>
                    <span className="font-bold">{review.name}</span>
                    <span className="text-gray-500">, {review.date}</span>
                  </div>
                </div>
                <div className="ml-4 text-gray-600">
                  {review.review}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default KoreanCourseDetailPage;
