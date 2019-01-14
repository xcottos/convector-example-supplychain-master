import * as yup from 'yup';
import {
  ConvectorModel,
  Default,
  ReadOnly,
  Required,
  Validate
} from '@worldsibu/convector-core-model';

export class Supplychainchaincode extends ConvectorModel<Supplychainchaincode> {
  @ReadOnly()
  @Required()
  public readonly type = 'io.worldsibu.supplychainchaincode';

  @Required()
  @Validate(yup.string())
  public name: string;

  @ReadOnly()
  @Required()
  @Validate(yup.number())
  public created: number;

  @Required()
  @Validate(yup.number())
  public modified: number;
}