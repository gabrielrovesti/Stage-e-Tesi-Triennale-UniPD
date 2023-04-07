import { Config } from '../config/config';
import { ImportFile } from '@resolver-engine/imports';
export declare function compileNative(config: Config): (sources: ImportFile[]) => Promise<any>;
export declare function createBuildCommand(config: Config): string;
