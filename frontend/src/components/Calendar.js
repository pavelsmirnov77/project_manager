import React from "react";
import {Card, DatePicker} from "antd";

const {RangePicker} = DatePicker;

const Calendar = () => {
    return (
        <Card
            style={{
                width: "250px",
                textAlign: "center",
                padding: "8px",
                background: "#333",
                color: "#fff",
                fontSize: "16px",
                borderRadius: "8px",
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
            }}
            hoverable
        >
            <div>
                <div style={{paddingBottom: 20}}>
                    Календарь
                </div>
                <DatePicker
                    style={{width: "100%"}}
                    autoFocus
                    format="DD-MM-YYYY"
                />
            </div>
        </Card>
    );
};

export default Calendar;
