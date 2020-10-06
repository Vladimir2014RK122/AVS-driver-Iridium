// Unit: AVS-driver







function startInfo(){

    IR.Log("\n");
    IR.Log("****AVS DRIVER STARTED****");
    
    IR.Log("Commands: ");
    for(var i =0;i<g_Commands.length; i++){
    
        IR.Log(g_Commands[i].name + " dpt = " + g_Commands[i].dpt + " address = " + g_Commands[i].address);
    }
    IR.Log("Feedbacks: ");
    for(var i =0;i<g_Feedbacks.length; i++){
    
        IR.Log(g_Feedbacks[i].name + " dpt = " + g_Feedbacks[i].dpt + " address = " + g_Commands[i].address);
    }
    
    IR.Log("\n");
    IR.Log("Driver name: " + g_avs_driver.Name);
    IR.Log("Driver Host: " + g_avs_driver.Host);
    IR.Log("Driver Port: " + g_avs_driver.Port);
    
    IR.Log("\n");
    IR.Log("****AVS DRIVER STARTED****\n");
    var n = 20.45;
    var array = floatToHex(n);
    IR.Log("n = " + n + " array = " + array[0].toString(16) + array[1].toString(16) + array[2].toString(16) + array[3].toString(16));
    
    var n = 20.35;
    var array = floatToHex(n);
    IR.Log("n = " + n + " array = " + array[0].toString(16) + array[1].toString(16) + array[2].toString(16) + array[3].toString(16));
    
    var n = 0.1;
    var array = floatToHex(n);
    IR.Log("n = " + n + " array = " + array[0].toString(16) + array[1].toString(16) + array[2].toString(16) + array[3].toString(16));

}

IR.AddListener(IR.EVENT_START, 0, function ()
{

    IR.GetDevice(g_avs_driver.Name).Connect();

    startInfo()
    

});

var feedbackReadRequestCounter = 0;//need for increment feedback index when read feedbacks

IR.AddListener(IR.EVENT_ONLINE, IR.GetDevice(g_driver_name), function() 
{  
    IR.Log("[AVS-driver ONLINE]");
    
    // send resd request:
    feedbackReadRequestCounter =0;
    if(readFeedbacksWhenConnected){
        for(var i = 0; i< g_Feedbacks.length;i++ ){
                    
            IR.SetTimeout(i*timeDelayForReadRequests, function(){
                
                var j = feedbackReadRequestCounter;
                var array = sendData(READ, g_Feedbacks[j].address, g_Feedbacks[j].dpt, 0);
                IR.GetDevice(g_driver_name).Send(array);
                IR.Log(array);
                feedbackReadRequestCounter++;
                
            });
            
            
        }        
    }
});


IR.AddListener(IR.EVENT_OFFLINE, IR.GetDevice(g_driver_name), function() 
{  
    IR.Log("[AVS-driver OFFLINE]");
});


//var g_driver_name = "avs_multiport_1";
IR.AddListener(IR.EVENT_RECEIVE_DATA, IR.GetDevice(g_driver_name), function(data) 
{  
    var telegram = receiveData(data);
    IR.Log("input telegram: " + 
    ", source = " + telegram.sourceDevice + 
    ", telType = " + telegram.telType +
    ", address = " + telegram.address + 
    ", dpt = " + telegram.dpt +    
    ", value = " + telegram.value);
    
    //find feedback and set value into:
    for(var i = 0; i< g_Feedbacks.length;i++ ){
        
        if(g_Feedbacks[i].address == telegram.address){
            IR.GetDevice(g_driver_name).SetFeedback(g_Feedbacks[i].name, telegram.value);
        }
        
    }
    
});

IR.AddListener(IR.EVENT_CHANNEL_SET, IR.GetDevice(g_driver_name), function(name, value, data) {  
   
    IR.Log("[AVS driver command] name = " + name + "/" + "value = " + value + "/" + "data = " + data);
   
    //find command and send value to driver:
    for(var i = 0; i< g_Commands.length;i++ ){
        
        if(g_Commands[i].name == name){
            
            var array = sendData(WRITE, g_Commands[i].address, g_Commands[i].dpt, value);
            IR.GetDevice(g_driver_name).Send(array);
            
            //IR.Log(array);
        }
        
    }
    
});


function receiveData(data){

    IR.Log("received DATA : " + data);
    if( !(data[0] == 0x00 && data[1] == 0x01) ){ 
        return;
        IR.Log("WRONG DATA");
    }
    
    var dataLen = ((0xFF & data[2]) << 8) | data[3];
    var sourceDevice = ((0xFF & data[4]) << 8) | data[5];
    var telType = data[6];// 1-write, 2-read, 3 - response
    var address = ((0xFF & data[7]) << 8) | data[8];
    var dpt = data[9];
    
    var hexNum = 0;
    var value = 0;
    if(dpt == DPT1){
        hexNum = data[10];
        value = hexToType(hexNum, dpt)
    }else if(dpt == DPT2){
        hexNum = data[10];
        value = hexToType(hexNum, dpt)
    }else if(dpt == DPT3){
        hexNum = data[10];
        value = hexToType(hexNum, dpt)
    }else if(dpt == DPT4){
        hexNum = data[10];
        value = hexToType(hexNum, dpt)
    }else if(dpt == DPT5){
        hexNum = ((0xFF & data[10]) << 8) | data[11];
        value = hexToType(hexNum, dpt)
    }else if(dpt == DPT6){
        hexNum = ((0x00000000 | data[10]) << 24) | ((0x00000000 | data[11]) << 16) | ((0x00000000 | data[12]) << 8) | data[13];
        value = hexToType(hexNum, dpt)
        
    }else if(dpt == DPT7){
        hexNum = ((0x00000000 | data[10]) << 16) | ((0x00000000 | data[11]) << 8) | data[12];
        value = hexToType(hexNum, dpt)
    }else if(dpt == DPT8){
        hexNum = ((0x00000000 | data[10]) << 16) | ((0x00000000 | data[11]) << 8) | data[12];
        value = hexToType(hexNum, dpt)
    }else if(dpt == DPT9){
        hexNum = ((0x00000000 | data[10]) << 24) | ((0x00000000 | data[11]) << 16) | ((0x00000000 | data[12]) << 8) | data[13];
        value = hexToType(hexNum, dpt)
    }else if(dpt == DPT10){
        hexNum = ((0x00000000 | data[10]) << 24) | ((0x00000000 | data[11]) << 16) | ((0x00000000 | data[12]) << 8) | data[13];
        value = hexToType(hexNum, dpt)
    }else if(dpt == DPT11){
        hexNum = ((0x00000000 | data[10]) << 24) | ((0x00000000 | data[11]) << 16) | ((0x00000000 | data[12]) << 8) | data[13];
        value = hexToType(hexNum, dpt)
        
    }

    
    
    return {"address":address, "dpt":dpt, "value":value, "sourceDevice":sourceDevice, "telType":telType}
    

}

/*
    telType : 1-write, 2-read, 3 - response
*/
function sendData(telType, address, dpt, value){
    
    var data = [];
    var dataLen = 6;
    
    if(dpt == 1 || dpt == 2 || dpt == 3 || dpt == 4){
        dataLen +=1;
    }else if(dpt == 5){
        dataLen +=2;
    }else if(dpt == 6 || dpt == 7 || dpt == 8 || dpt == 9 || dpt == 10 || dpt == 11){
        dataLen +=4;
    }
    
    data[0] = 0x00;
    data[1] = 0x01;
    data[2] = (dataLen & 0xff00) >> 8;
    data[3] = dataLen & 0x00ff;
    data[4] = (g_phy_address & 0xff00) >> 8;
    data[5] = g_phy_address & 0x00ff;
    data[6] = telType;
    data[7] = (address & 0xff00) >> 8;
    data[8] = address & 0x00ff;
    data[9] = dpt;
    
    if(telType == 2){
        data[10] = 0;
        return data;
    }
    
    if(dpt == 1){
        
        if(value != 0 && value != 1){
            data[10] = 0;
        }else{
            data[10] = Number(value);
        }
        
    }else if(dpt == 2){
        if(value < 0){
            data[10] = 0;
        }else if(value > 255){
            data[10] = 255;
        }else{
            data[10] = Number(value);
        }
    }else if(dpt == 3){
        
        data[10] = int64ToInt8(value);
        
    }else if(dpt == 4){
        
        if(value == 0){
            data[10] = 0x00;//stop
        }else if(value == 2){
            data[10] = 0xff;//up
        }else if(value == 1){
            data[10] = 0x0f;//down
        }
    
    }else if(dpt == 5){
        
        if(value < 0){
            value = 0;
        }
        else if(value > 65535){
            value = 65535;
        }
        data[10] = (value & 0xff00) >> 8;
        data[11] = value & 0x00ff;
    
    }else if(dpt == 6){
        
        var hexValue = floatToHex(value);//array
        data[10] = hexValue[0];
        data[11] = hexValue[1];
        data[12] = hexValue[2];
        data[13] = hexValue[3];
        
    }else if(dpt == 7){
        
        data[10] = 0;//not used
        data[11] = value[0];//red
        data[12] = value[1];//green
        data[13] = value[2];//blue
              
        if(typeof(value) == "string"){
            
            var value = JSON.Parse("{ \"data\":" + value + "}");      
            data[10] = 0;//not used
            data[11] = value.data[0] & 0xff;//red
            data[12] = value.data[1] & 0xff;//green
            data[13] = value.data[2] & 0xff;//blue
            
        }
    
    }else if(dpt == 8){
        
        data[10] = 0;//not used
        data[11] = value[0];//hour
        data[12] = value[1];//min
        data[13] = value[2];//day
              
        if(typeof(value) == "string"){
            
            var value = JSON.Parse("{ \"data\":" + value + "}");      
            data[10] = 0;//not used
            data[11] = value.data[0] & 0xff;//hour
            data[12] = value.data[1] & 0xff;//min
            data[13] = value.data[2] & 0xff;//day
            
        }
    
    }else if(dpt == 9){
        
        //not uses
        data[10] = 0;
        data[11] = 0;
        data[12] = 0;
        data[13] = 0;
    
    }else if(dpt == 10){
        data[10] = (value & 0xff000000) >> 24;
        data[11] = (value & 0x00ff0000) >> 16;
        data[12] = (value & 0x0000ff00) >> 8;
        data[13] = (value & 0x000000ff) >> 0;
    
    }else if(dpt == 11){
        data[10] = (value & 0xff000000) >> 24;
        data[11] = (value & 0x00ff0000) >> 16;
        data[12] = (value & 0x0000ff00) >> 8;
        data[13] = (value & 0x000000ff) >> 0;
    }
    
    return data;
    
}



function hexToType(hexNum, dpt){
    
    if(dpt == 1){
        if(hexNum != 0 && hexNum != 1){
            IR.Log("AVS-driver. ERROR DATA");
            return 0;
        }
        return hexNum;
    }else if(dpt == 2){
        if(hexNum < 0){
            IR.Log("AVS-driver. ERROR DATA");
            return 0;
        }else if(hexNum > 255){
            IR.Log("AVS-driver. ERROR DATA");
            return 255;
        }
        return hexNum;
    }else if(dpt == 3){
        if(hexNum < 0){
            IR.Log("AVS-driver. ERROR DATA");
            return hexToInt8(0);
        }else if(hexNum > 255){
            IR.Log("AVS-driver. ERROR DATA");
            return hexToInt8(255);
        }
        return hexToInt8(hexNum);
    }else if(dpt == 4){
    
        var upDown = hexNum & 0xf0;
        var startStop = hexNum & 0x0f;
        
        if(startStop == 0){
            return 0;
        }else if(upDown == 0){
            return 1;
        }else{
            return 2;
        }
        
    }else if(dpt == 5){
        if(hexNum < 0){
            IR.Log("AVS-driver. ERROR DATA");
            return 0;
        }else if(hexNum > 65535){
            IR.Log("AVS-driver. ERROR DATA");
            return 65535;
        }
        return hexNum;
    }else if(dpt == 6){
        if(hexNum > 0xffffffff){
            IR.Log("AVS-driver. ERROR DATA");
            return 0;
        }
        return hexTofloat(hexNum);
    }else if(dpt == 7){

        return [(0xff0000 & hexNum)>>16, (0xff00 & hexNum)>>8, (0xff & hexNum)>>0].toString();
    }else if(dpt == 8){
        var hour = (0xff0000 & hexNum)>>16;
        var minutes = (0xff00 & hexNum)>>8;
        var day = (0xff & hexNum)>>0;
        return [hour, minutes, day].toString();
    }else if(dpt == 9){
        /*
        var day = (0xff0000 & hexNum)>>16;
        var month = (0xff0000 & hexNum)>>8;
        var year = (0xff0000 & hexNum)>>0;*/
        return "" + hexNum;
    }else if(dpt == 10){
        if(hexNum < 0){
            return 0;
            IR.Log("AVS-driver. ERROR DATA");
        }else if(hexNum >4294967295){
            IR.Log("AVS-driver. ERROR DATA");
            return 4294967295;
        }else{
            return hexNum;
        }
    }else if(dpt == 11){
        return hexNum;
    }
}



function AVSsendTelegram(telType, address, dpt, value){
    var array = sendData(1, g_Commands[i].address, g_Commands[i].dpt, value);
    IR.GetDevice(g_driver_name).Send(array);    
}
    






function hexTofloat(num) {
    var sign = (num & 0x80000000) ? -1 : 1;
    var exponent = ((num >> 23) & 0xff) - 127;
    var mantissa = 1 + ((num & 0x7fffff) / 0x7fffff);
    return sign * mantissa * Math.pow(2, exponent);
}

function hexToInt8(num) {
    if (num > 127) { num = num - 256 }
    return num
}

function hexToInt32(num) {
    //if (num > 2147483647) { num = num - 4294967296 }
    return num
}

function int64ToInt8(num){
    var result = num & 0x7F;
    
    if(num < 0){
        result |= 0x80;
    }

    
    return result;
}


function floatToHex(floatValue){
  var floatVal = floatValue;
  var p = 0;
  var sign
  var exp
  var mantissa
  var result
  
  if(floatVal > 0)floatVal = Number(floatVal) + 0.0099;
  else if(floatVal < 0)floatVal = Number(floatVal) - 0.0099;
  
  IR.Log("floatVal = " + floatVal);
  
  if(floatValue == 0)return [0,0,0,0];

  //find sign:
  if(floatVal >= 0)sign = 0
  else sign = 1

  floatVal = Math.abs(floatVal)
  
  //find exp:
  if(floatVal > 1){
    for(var i = 0;i<8;i++){
    
      if(floatVal/Math.pow(2, i) < 2){
        p = i;
        break;
      }
    }

  }else if(floatVal < 1){
    for(var i = 0;i<8;i++){
      if(floatVal*Math.pow(2, i) >= 1 ){
         
        p = (-1)*i;
        break;
      }
    }  
  }
  exp = p +127

  //get mantissa:
  mantissa = floatVal/Math.pow(2, p)
  //IR.Log("mantissa = " + mantissa);
  var mString = mantissa.toString(2)
  //IR.Log("mString 1 = " + mString);
  //IR.Log("mString 1 length = " + mString.length);
  mString = mString.substring(2, 22);
  //IR.Log("mString[19] = " + mString.charAt(19));
  if(mString.charAt(19) == '2'){
    mString = mString.substring(0, 18);
    mString += "11";
  }
  //IR.Log("mString 2 = " + mString);
  mantissa = parseInt(mString, 2)
  
  var shift = 23 - mString.length;
  mantissa = mantissa << shift;
  
  
  
  
  //IR.Log("p = " + p);
  //IR.Log("exp = " + exp.toString(2) + "  " + exp.toString(16));
  //IR.Log("mantissa = " + mantissa.toString(2) + "  " + mantissa.toString(16));

  //getResult
  
  result = ((0x000000ff & exp) << 23) | mantissa; 

  var returnArray = [];
  returnArray[0] = (((0xff<< 24) & result) >> 24) | (sign << 7);
  returnArray[1] = (((0xff<< 16) & result) >> 16);
  returnArray[2] = (((0xff<< 8) & result) >> 8);
  returnArray[3] = ((0xff<< 0) & result >> 0);
  
  //IR.Log(returnArray[0].toString(16) + "" + returnArray[1].toString(16) + "" + returnArray[2].toString(16) + "" + returnArray[3].toString(16));

  return returnArray
}

