export class InstructorDetails {
  encPassword?: string;
  password?: string;
  roleId?: number;
  name?: string;
  roleName?: string;
  id?: number;
  email?: string;
}

export class CourseModel {
  id?: number;
  title?: string;
  instructorId?: number;
  description?: string;
  avgDuration?: number;
  difficulty?: string;
  instructorDetails?: InstructorDetails;

  constructor(data: any) {
    Object.assign(this, data);
  }
}
