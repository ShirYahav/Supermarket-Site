import jwt from "jsonwebtoken";
import crypto from "crypto";
import  { CustomerModel, ICustomerModel }  from "../03-models/customer-model";

const salt = "saltyHairDontCare"; 

function hash(plainText: string): string {

    if(!plainText) return null;

    const hashedText = crypto.createHmac("sha512", salt).update(plainText).digest("hex");

    return hashedText;
}


const secretKey = "MiloIsTheBest";

function getNewToken(customer: ICustomerModel): string {

    const payload = { customer };

    const token = jwt.sign(payload, secretKey, { expiresIn: "2h" });

    return token;
}

function verifyToken(authorizationHeader: string): Promise<boolean> {

    return new Promise((resolve, reject) => {

        if(!authorizationHeader) {
            resolve(false);
            return;
        }

        const token = authorizationHeader.split(" ")[1];

        if(!token) {
            resolve(false);
            return;
        }

        jwt.verify(token, secretKey, (err) => {

            if(err) {
                resolve(false);
                return;
            }

            resolve(true);
        });

    });
    
}


function getCustomerFromToken(authorizationHeader: string): ICustomerModel {

    const token = authorizationHeader.split(" ")[1];

    const payload: any = jwt.decode(token);

    const customer = payload.customer;

    return customer;
}

export default {
    getNewToken,
    verifyToken,
    hash,
    getCustomerFromToken
};