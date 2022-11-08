import { create } from "./create"
import { runServer } from "./runServer"
import { build } from "./build"

export function cli(arg) {
    switch (arg[2]) {
        case 'create':
            create()
            break;
        case 'run':
            runServer()
            break;
        case 'build':
            build()
            break;
        default:
            console.log('未知命令');
            break;
    }
}