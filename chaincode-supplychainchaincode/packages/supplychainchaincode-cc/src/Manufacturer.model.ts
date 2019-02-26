import * as yup from 'yup';
import {
  ConvectorModel,
  Default,
  ReadOnly,
  Required,
  Validate
} from '@worldsibu/convector-core-model';

export class Manufacturer extends ConvectorModel<Manufacturer> {
  @ReadOnly()
  @Required()
  public readonly type:string = 'io.worldsibu.Manufacturer';

  @Required()
  @Validate(yup.string())
  public name: string;

  @Required()
  @Validate(yup.number())
  public productsAvailable: number;

  @Required()
  @Validate(yup.number())
  public rawMaterialAvailable: number;

}
