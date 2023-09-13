import { PriorityType } from "../../enums/PriorityType";

const mapPriority = (priority: string): PriorityType => {
    switch (priority) {
      case 'Low':
        return PriorityType.Low;
      case 'Medium':
        return PriorityType.Medium;
      case 'High':
        return PriorityType.High;
      default:
        return PriorityType.Low;
    }
}

export { mapPriority };