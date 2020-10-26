import ILoginObject from './ILoginObject';
import IField from '../../forms/IField';

export default interface IRegistrationRequest extends ILoginObject {
    email: IField;
    firstName: IField;
    lastName: IField;
    passwordRetype: IField;
}