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
  public readonly type = 'io.worldsibu.Distributor';

  @Required()
  @Validate(yup.string())
  public name: string;

  // @ReadOnly()
  // @Required()
  // @Validate(yup.number())
  // public created: number;
  //
  // @Required()
  // @Validate(yup.number())
  // public modified: number;

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
