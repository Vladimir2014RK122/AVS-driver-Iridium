// Unit: Script 1

var DPT1 = 1;//    uint8 (0 or 1)
var DPT2 = 2;//    uint8 (0...255)
var DPT3 = 3;//    int8 (-128...127)
var DPT4 = 4;//    uint8 (0 - stop, 1 - down, 2 - up)
var DPT5 = 5;//    uint16 (0...65535)
var DPT6 = 6;//    float32
var DPT7 = 7;//    array [red: uint8, green: uint8, blue: uint8] (RGB: 1 byte - red, 2 - byte green, 3 byte - blue))
var DPT8 = 8;//    array[timeHour: uint8, timeMin: uint8, day: uint8] 
var DPT9 = 9;//    date (String)    //NOT USES
var DPT10 = 10;//  uint32
var DPT11 = 11;//  int32

var WRITE = 1;//    telegram type WRITE
var READ = 2;//  telegram type READ



function Command(name, dpt, address){
    
    this.name = name;
    this.dpt = dpt;   
    return {"name":name, "dpt":dpt, "address":address}
}
function Feedback(name, dpt, address){
    
    this.name = name;
    this.dpt = dpt;  
    return {"name":name, "dpt":dpt, "address":address}
}