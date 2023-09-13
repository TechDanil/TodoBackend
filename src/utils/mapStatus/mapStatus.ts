import { StatusType } from "../../enums/StatusType";

const mapStatus = (status: string): StatusType => {
    switch (status) {
        case 'to be executed':
            console.log('Mapped to TO_BE_EXECUTED');
            return StatusType.TO_BE_EXECUTED;
        case 'progress':
            console.log('Mapped to TO_BE_EXECUTED');
            return StatusType.IN_PROGRESS;
        case 'completed':
            console.log('Mapped to COMPLETED');
            return StatusType.COMPLETED;
        case 'canceled':
            console.log('Mapped to CANCELED');
            return StatusType.CANCELED;
        default:
            console.log('Mapped to default: TO_BE_EXECUTED');
            return StatusType.TO_BE_EXECUTED;
    }
}

export { mapStatus };