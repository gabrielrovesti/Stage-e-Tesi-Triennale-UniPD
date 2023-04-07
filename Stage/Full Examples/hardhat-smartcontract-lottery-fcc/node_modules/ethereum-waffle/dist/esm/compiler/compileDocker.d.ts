import { Config } from '../config/config';
import { ImportFile } from '@resolver-engine/imports';
export declare function compileDocker(config: Config): (sources: ImportFile[]) => Promise<any>;
export declare function createBuildCommand(config: Config): string;
export declare function getVolumes(config: Config): string;
