import cyber from "../01-utils/cyber";
import { CredentialsModel, ICredentialsModel } from "../03-models/credentials-model";
import { CustomerModel, ICustomerModel } from "../03-models/customer-model";
import ErrorModel from "../03-models/error-model";
import RoleModel from "../03-models/role-model";


async function register(customer: ICustomerModel): Promise<string> {

    const errors = customer.validateSync();
    if (errors) throw new ErrorModel(400, errors.message);

    const isTaken = await isEmailTaken(customer);
    if (isTaken) {
        throw new ErrorModel(400, `email ${customer.email} already taken`);

    }

    const isIdTaken = await isCustomerIdTaken(customer);
    if (isIdTaken) {
        throw new ErrorModel(400, `Customer Id ${customer.customerId} already taken`);

    }

    customer.password = cyber.hash(customer.password);

    customer.role = RoleModel.User;

    customer.save();

    delete customer.password;

    const token = cyber.getNewToken(customer);

    return token;
}

async function login(credentials: ICredentialsModel): Promise<string> {

    const errors = credentials.validateSync();
    if (errors) throw new ErrorModel(400, errors.message);

    credentials.password = cyber.hash(credentials.password);

    const existingCustomer = await CustomerModel.findOne({ email: credentials.email, password: credentials.password}).exec();

    if(!existingCustomer) {
        throw new ErrorModel(401, "Incorrect email or password");
    }

    delete existingCustomer.password;

    const token = cyber.getNewToken(existingCustomer);

    return token;
}

async function isEmailTaken(customer: ICustomerModel): Promise<boolean> {
    customer = await CustomerModel.findOne({email: customer.email})
    if(!customer){
        return false;
    }
    return true
}

async function isCustomerIdTaken(customer: ICustomerModel): Promise<boolean> {
    customer = await CustomerModel.findOne({customerId: customer.customerId})
    if(!customer){
        return false;
    }
    return true
}

export default {
    register,
    login,
    isEmailTaken,
    isCustomerIdTaken
}
