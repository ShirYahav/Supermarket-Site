import { Injectable } from '@angular/core';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';

@Injectable({
    providedIn: 'root'
})
export class NotifyService {

    private notification = new Notyf({ 
      duration: 4000,
      position: { x: "center", y: "top" },
      types: [{type: 'error', background: '#A98658'}, {type: 'success', background: '#06621F'}]
      });

    public success(message: string): void {
        this.notification.success(message);
    }
    
    public error(err: any): void {
        const message = this.extractErrorMessage(err);
        this.notification.error(message);
    }

    private extractErrorMessage(err: any): string {

        if(typeof err === "string") return err;

        if(typeof err.error === "string") return err.error; 

        if(Array.isArray(err.error)) return err.error[0]; 

        if(typeof err.message === "string") return err.message;

        return "Something went wrong, please try again...";
    }
}
