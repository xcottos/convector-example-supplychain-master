import * as yup from 'yup';
import {
  ConvectorModel,
  Default,
  ReadOnly,
  Required,
  Validate
} from '@worldsibu/convector-core-model';

export class Supplier extends ConvectorModel<Supplier> {
  @ReadOnly()
  @Required()
  public readonly type:string = 'io.worldsibu.Supplier';

  @Required()
  @Validate(yup.string())
  public name: string;

  @Required()
  @Validate(yup.number())
  public rawMaterialAvailable: number;

}
