import AssignmentsDao from "./dao.js";

export default function AssignmentRoutes(app, db) {
  const dao = AssignmentsDao(db);

  const findAssignmentsForCourse = async (req, res) => {
    const { courseId } = req.params;
    const assignments = await dao.findAssignmentsForCourse(courseId);
    res.json(assignments);
  };

  const findAssignmentById = async (req, res) => {
    const { assignmentId } = req.params;
    const assignment = await dao.findAssignmentById(assignmentId);
    res.json(assignment);
  };

  const createAssignmentForCourse = async (req, res) => {
    const { courseId } = req.params;
    const assignment = req.body;
    const newAssignment = await dao.createAssignment(courseId, assignment);
    res.json(newAssignment);
  };

  const updateAssignment = async (req, res) => {
    const { assignmentId } = req.params;
    const assignmentUpdates = req.body;
    const status = await dao.updateAssignment(assignmentId, assignmentUpdates);
    res.json(status);
  };

  const deleteAssignment = async (req, res) => {
    const { assignmentId } = req.params;
    const status = await dao.deleteAssignment(assignmentId);
    res.json(status);
  };

  app.get("/api/courses/:courseId/assignments", findAssignmentsForCourse);
  app.get(
    "/api/courses/:courseId/assignments/:assignmentId",
    findAssignmentById
  );
  app.post("/api/courses/:courseId/assignments", createAssignmentForCourse);
  app.put(
    "/api/courses/:courseId/assignments/:assignmentId",
    updateAssignment
  );
  app.delete(
    "/api/courses/:courseId/assignments/:assignmentId",
    deleteAssignment
  );
}
