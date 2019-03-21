import * as yup from 'yup';
import {
  ConvectorModel,
  Default,
  ReadOnly,
  Required,
  Validate
} from '@worldsibu/convector-core-model';

export class Distributor extends ConvectorModel<Distributor> {
  @ReadOnly()
  @Required()
  public readonly type:string = 'io.worldsibu.Distributor';

  @Required()
  @Validate(yup.string())
  public name: string;

  @Required()
  @Validate(yup.number())
  public productsToBeShipped: number;

  @Required()
  @Validate(yup.number())
  public productsShipped: number;

  @Required()
  @Validate(yup.number())
  public productsReceived: number;
}
