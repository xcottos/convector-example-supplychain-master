import * as yup from 'yup';
import {
  ConvectorModel,
  Default,
  ReadOnly,
  Required,
  Validate
} from '@worldsibu/convector-core-model';

export class Customer extends ConvectorModel<Customer> {
  @ReadOnly()
  @Required()
  public readonly type:string = 'io.worldsibu.Customer';

  @Required()
  @Validate(yup.string())
  public name: string;
  
  @Required()
  @Validate(yup.number())
  public productsBought: number;
}
