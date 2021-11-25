/**
* Needs <script src="https://unpkg.com/testado"></script> in browser
* or import 'testado' in nodejs
*/	
import { D, T } from './DateTime.js'

var res, ref

export default async({test})=>

	await test `D & T (Date & Time)`( async ({ok})=>{
	
		ok `D output Dates` ( D`2020` instanceof Date )
		ok `good date.getTime with year` ( D`2020`.getTime() == 1577836800000 )
		ok `good date.getTime with year-month` ( D`2020-03`.getTime() == 1583020800000 )
		ok `good date.getTime with year-month-day` ( D`2020-03-25`.getTime() == 1585094400000 )
		
		let thatDay = T`2020-03-25`
		
		ok `T output functions` ( thatDay && typeof thatDay == 'function' )
		
		ok `good date.time with empty time` ( thatDay``.getTime() == 1585090800000 )
		ok `good date.time with hour` ( thatDay`12:`.getTime() == 1585134000000 )
		ok `good date.time with hour:minute` ( thatDay`12:42`.getTime() == 1585136520000 )
		ok `good date.time with hour:minute:second` ( thatDay`12:34:56`.getTime() == 1585136096000 )
		ok `good date.time with hour:minute:second:millis` ( thatDay`12:34:56:789`.getMilliseconds() == 789 )
		
	})