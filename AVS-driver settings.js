// Unit: Commands
// var g_driver_name = "Multiport 1";
// var g_avs_driver = IR.GetDevice(g_driver_name);
var g_phy_address = 6233;
var readFeedbacksWhenConnected = false;
var timeDelayForReadRequests = 2000;// ms, min 200ms

g_drivers = [
    "My multiport device 1",
    "My multiport device 2",       
    "My multiport device 3"   
];

//add commands for control devices
g_Commands = [

    Command("MyCommand 1" , DPT1, 1, g_driver[0]),
    Command("MyCommand 2" , DPT2, 2, g_driver[0]),
    Command("MyCommand 3" , DPT3, 3, g_driver[0]),
    Command("MyCommand 4" , DPT4, 4, g_driver[0]),
    Command("MyCommand 5" , DPT5, 5, g_driver[0]),
    Command("MyCommand 6" , DPT6, 6, g_driver[0]),
    Command("MyCommand 7" , DPT7, 7, g_driver[0]),
    Command("MyCommand 8" , DPT8, 8, g_driver[0]),
    Command("MyCommand 9" , DPT9, 9, g_driver[0]),
    Command("MyCommand 10" , DPT10, 10, g_driver[0]),
    Command("MyCommand 11" , DPT11, 11, g_driver[0])
    
];

//add feedbacks for get states of devices
g_Feedbacks = [

    Feedback("MyFeedback 1" , DPT1, 1, g_driver[0]),
    Feedback("MyFeedback 2" , DPT2, 2, g_driver[0]),
    Feedback("MyFeedback 3" , DPT3, 3, g_driver[0]),
    Feedback("MyFeedback 4" , DPT4, 4, g_driver[0]),
    Feedback("MyFeedback 5" , DPT5, 5, g_driver[0]),
    Feedback("MyFeedback 6" , DPT6, 6, g_driver[0]),
    Feedback("MyFeedback 7" , DPT7, 7, g_driver[0]),
    Feedback("MyFeedback 8" , DPT8, 8, g_driver[0]),
    Feedback("MyFeedback 9" , DPT9, 9, g_driver[0]),
    Feedback("MyFeedback 10" , DPT10, 10, g_driver[0]),
    Feedback("MyFeedback 11" , DPT11, 11, g_driver[0])
    
];

