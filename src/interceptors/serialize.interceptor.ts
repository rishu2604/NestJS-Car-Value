import { UseInterceptors, NestInterceptor, ExecutionContext, CallHandler } from "@nestjs/common";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { plainToClass } from "class-transformer";
import { UserDto } from "../users/dtos/user.dto";

export class SerializeInterceptor implements NestInterceptor{
    intercept(context: ExecutionContext, next: CallHandler): Observable<any>{
        // Run something before a request is handled by the request handler
        // console.log('I am running before the handler', context);

        
        return next.handle().pipe(
            map((data: any)=>{
                // Run something before the response is sent out
                // console.log('I am running before the response is sent out', data);
                return plainToClass(UserDto, data, {
                    excludeExtraneousValues: true
                })
            })
        )
    }
}