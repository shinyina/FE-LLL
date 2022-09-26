import { create } from "./create"
import { runServer } from "./runServer"
import { build } from "./build"

export function cli(arg){
    if(arg[2]==='create') create()
    else if(arg[2]==='run') runServer()
    else if(arg[2]==='build') build()
    else console.log('未知命令');
}