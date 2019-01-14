import * as yup from 'yup';
import {
  ConvectorModel,
  Default,
  ReadOnly,
  Required,
  Validate
} from '@worldsibu/convector-core-model';

export class Retailer extends ConvectorModel<Retailer> {
  @ReadOnly()
  @Required()
  public readonly type = 'io.worldsibu.Retailer';

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
  public productsOrdered: number;

  @Required()
  @Validate(yup.number())
  public productsAvailable: number;

  @Required()
  @Validate(yup.number())
  public productsSold: number;
}
