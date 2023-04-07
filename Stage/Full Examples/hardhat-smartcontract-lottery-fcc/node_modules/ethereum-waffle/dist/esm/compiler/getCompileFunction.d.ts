import { Config } from '../config/config';
import { ImportFile } from '@resolver-engine/imports';
export declare type CompileFunction = (sources: ImportFile[], findImports: (file: string) => any) => any;
export declare function getCompileFunction(config: Config): CompileFunction;
