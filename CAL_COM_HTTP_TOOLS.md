# Cal.com HTTP Tools

This document provides a list of predefined templates for the HTTP tool for Cal.com.

### Check Available Times
Get a list of available slots for scheduling.
```json
{
  "url": "https://m.chatvolt.ai/cal/slots?username=<your-cal.com-username>&event=<event-name>&days=15&max=10&timeZone=America/Sao_Paulo",
  "body": [],
  "name": "API Free Time Slots",
  "method": "GET",
  "headers": [],
  "description": "API Free Time Slots: Use to find available times for scheduling meetings.",
  "pathVariables": [],
  "queryParameters": [
    {
      "key": "username",
      "value": "<your-cal.com-username>",
      "description": "",
      "acceptedValues": [],
      "isUserProvided": false
    },
    {
      "key": "event",
      "value": "<event-name>",
      "description": "",
      "acceptedValues": [],
      "isUserProvided": false
    },
    {
      "key": "days",
      "value": "15",
      "description": "",
      "acceptedValues": [],
      "isUserProvided": false
    },
    {
      "key": "max",
      "value": "10",
      "description": "",
      "acceptedValues": [],
      "isUserProvided": false
    },
    {
      "key": "timeZone",
      "value": "America/Sao_Paulo",
      "description": "",
      "acceptedValues": [],
      "isUserProvided": false
    }
  ]
}
```

### Booking - Schedule Appointment
Book meetings or appointments in your default calendar linked to Cal.com.
```json
{
  "url": "https://m.chatvolt.ai/cal/booking?username=<your-cal.com-username>&event=<event-name>",
  "body": [
    {
      "key": "start",
      "value": "",
      "description": "Date time chosen by the user. Format: yyyy-MM-ddTHH:mm",
      "acceptedValues": [],
      "isUserProvided": true
    },
    {
      "key": "name",
      "value": "",
      "description": "User name",
      "acceptedValues": [],
      "isUserProvided": true
    },
    {
      "key": "email",
      "value": "",
      "description": "User E-mail",
      "acceptedValues": [],
      "isUserProvided": true
    },
    {
      "key": "timeZone",
      "value": "America/Sao_Paulo"
    },
    {
      "key": "language",
      "value": "pt"
    }
  ],
  "name": "API Booking",
  "method": "POST",
  "headers": [
    {
      "key": "Authorization",
      "value": "Bearer <your-cal.com-api-key>",
      "description": "",
      "acceptedValues": [],
      "isUserProvided": false
    }
  ],
  "description": "API Booking: Use to create a schedule after the user has confirmed the details.",
  "pathVariables": [],
  "queryParameters": [
    {
      "key": "username",
      "value": "<your-cal.com-username>",
      "description": "",
      "acceptedValues": [],
      "isUserProvided": false
    },
    {
      "key": "event",
      "value": "<event-name>",
      "description": "",
      "acceptedValues": [],
      "isUserProvided": false
    }
  ]
}
```

### Cancel Appointment
Cancel a scheduled appointment by UID.
```json
{
  "url": "https://api.cal.com/v2/bookings/:uid/cancel",
  "body": [
    {
      "key": "cancellationReason",
      "value": "",
      "description": "Cancellation Reason, if not informed, use: ''Reschedule''",
      "acceptedValues": [],
      "isUserProvided": true
    }
  ],
  "name": "API Cancel Appointment",
  "method": "POST",
  "headers": [
    {
      "key": "Authorization",
      "value": "Bearer <your-cal.com-api-key>"
    }
  ],
  "description": "API Cancel Appointment: Use to cancel a scheduled appointment by UID.",
  "pathVariables": [
    {
      "key": "uid",
      "value": "",
      "description": "UID of the appointment to be canceled.",
      "acceptedValues": [],
      "isUserProvided": true
    }
  ],
  "queryParameters": []
}