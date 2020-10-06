// Unit: Commands
var g_driver_name = "avs_multiport_1";
var g_avs_driver = IR.GetDevice(g_driver_name);
var g_phy_address = 6233;

var readFeedbacksWhenConnected = true;
var timeDelayForReadRequests = 300;// ms, min 200ms


g_Commands = [

    Command("command 1" , DPT1, 1),
    Command("command 2" , DPT2, 2),
    Command("command 3" , DPT3, 3),
    Command("command 4" , DPT4, 4),
    Command("command 5" , DPT5, 5),
    Command("command 6" , DPT6, 6),
    Command("command 7" , DPT7, 7),
    Command("command 8" , DPT8, 8),
    Command("command 9" , DPT9, 9),
    Command("command 10" , DPT10, 10),
    Command("command 11" , DPT11, 11)
    
];


g_Feedbacks = [

    Feedback("feedback 1" , DPT1, 1),
    Feedback("feedback 2" , DPT2, 2),
    Feedback("feedback 3" , DPT3, 3),
    Feedback("feedback 4" , DPT4, 4),
    Feedback("feedback 5" , DPT5, 5),
    Feedback("feedback 6" , DPT6, 6),
    Feedback("feedback 7" , DPT7, 7),
    Feedback("feedback 8" , DPT8, 8),
    Feedback("feedback 9" , DPT9, 9),
    Feedback("feedback 10" , DPT10, 10),
    Feedback("feedback 11" , DPT11, 11)
    
];
