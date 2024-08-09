export interface Hospital {
    hospital_id: number
    hospital_short: string
    hospital_name: string
    hospital_location: string
}


export interface MachineCategory {
    machine_category_id: number,
    machine_category_name: string
}

export interface Machine {
    machine_id: number,
    machine_name: string,
    machine_category: number,
    machine_hospital: number,
}

export interface PartCategory {
    part_category_id: number,
    part_category_name: string
}

export interface Sensor {
    sensor_id: number,
    sensor_name: string,
    sensor_status: number,
    sensor_timestamp: string,
    sensor_category: number,
    sensor_position: number,
    sensor_part: number
}

export interface SensorCategory {
    sensor_category_id: number,
    sensor_category_name: string
}




// -------------------------------------

export interface MachineAndHospital {
    machine_id: number
    machine_name: string
    machine_category: number
    machine_hospital: number
    hospital_id: number
    hospital_short: string
    hospital_name: string
    hospital_location: string
}

export interface MachineAndPart {
    machine_id: number;
    machine_category: number;
    machine_name: string;
    machine_hospital: number;
    part: Part[];
}

export interface Part {
    part_id: number,
    part_name: string,
    part_category: number,
    part_machine: number,
    sensor_list: Sensorlist[];
}

export interface PartAndSensor {
    part_id: number
    part_name: string
    part_category: number
    part_machine: number
    sensor_id: number
    sensor_name: string
    sensor_status: number
    sensor_timestamp: string
    sensor_category: number
    sensor_position: number
    sensor_part: number
    sensor_box_position_left: number
    sensor_box_position_top: number
    sensor_line_position_left: number
    sensor_line_position_top: number
    sensor_line_length: number
    sensor_line_rotation: number
}

export interface Sensorlist {
    sensor_id: number;
    sensor_name: string;
    sensor_status: number;
    sensor_timestamp: string;
    sensor_category: number
    sensor_position: number
    sensor_part: number
    sensor_box_position_left: number
    sensor_box_position_top: number
    sensor_line_position_left: number
    sensor_line_position_top: number
    sensor_line_length: number
    sensor_line_rotation: number
}

export interface PartAndMachine {
    part_id: number
    part_name: string
    part_category: number
    part_machine: number
    machine_id: number
    machine_category: number
    machine_name: string
    machine_hospital: number
}

export interface PartMachHos {
    part_id: number
    part_name: string
    part_category: number
    part_machine: number
    machine_id: number
    machine_category: number
    machine_name: string
    machine_hospital: number
    hospital_id: number
    hospital_name: string
    hospital_short: string
    hospital_location: string
}