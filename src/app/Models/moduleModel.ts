export class ModuleType {
    id?: number;
    type?: string;
  }
  
  export class ModuleModel {
    id?: number;
    title?: string;
    courseId?: number;
    description?: string;
    serialNumber?: number;
    moduleTypeId?: number;
    moduleType?: ModuleType;
    moduleContentUrl?: string;

    
    constructor(data: any) {
      Object.assign(this, data);
    }
  }
  