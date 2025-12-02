import { v4 as uuidv4 } from "uuid";
import model from "./model.js";

export default function CoursesDao(db) {
  const findAllCourses = () => model.find({}, { name: 1, description: 1 });

  const findCourseById = (courseId) => model.findById(courseId);

  const createCourse = (course) => {
    const newCourse = { ...course, _id: uuidv4() };
    return model.create(newCourse);
  };

  const updateCourse = (courseId, courseUpdates) =>
    model.updateOne({ _id: courseId }, { $set: courseUpdates });

  const deleteCourse = (courseId) => model.deleteOne({ _id: courseId });

  return {
    findAllCourses,
    findCourseById,
    createCourse,
    updateCourse,
    deleteCourse,
  };
}
