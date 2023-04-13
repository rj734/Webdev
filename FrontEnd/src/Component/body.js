import React from 'react';
import '../Style/body.css';

function Body() {
    return ( 
        <div>
            <p className="head1 card-title"><center><strong>Our Story</strong></center></p>
            <div className="card" style={{ width: "100%" }}>
                <div className="card-body">
                    <h4 class="card-text" className="text1">
                        We believe in good. We launched Fresh Pan Pizza Best Excuse Awards
                        on our Facebook fan page. Fans were given situations where they had
                        to come up with wacky and fun excuses. The person with the best
                        excuse won the Best Excuse Badge and won Pizzeria's vouchers. Their
                        enthusiastic response proved that Pizzena's Fresh Pan Pizza is the
                        Tastiest Pan Pizza. Ever!
                        <br/><br/>
                        Ever since we launched the Tastiest Pan Pizza, ever, people have not
                        been able to resist the softest, cheesiest, crunchiest, butteriest
                        Domino's Fresh Pan Pizza. They have been leaving the stage in the
                        middle of a performance and even finding excuses to be disqualified
                        in a football match.
                        <br /><br/>
                        We launched Fresh Pan Pizza Best Excuse Awards on our Facebook fan
                        page. Fans were given situations where they had to come up with
                        wacky and fun excuses. The person with the best excuse won the Best
                        Excuse Badge and won Domino's vouchers. Their enthusiastic response
                        proved that Pizzeria's Fresh Pan Pizza is the Tastiest Pan Pizza.
                        Ever!
                    </h4>
                </div>
                <div className="card-body">
                <div  className="text2 card-text">
                    <div className="text2-left">
                    {" "}
                    <img src="https://image.shutterstock.com/z/stock-photo-raw-dough-for-pizza-with-ingredients-and-spices-on-table-526830277.jpg" 
                        alt=""
                        height="300px" width="350px" style={{marginLeft:"30px"}}/>
                    </div>
                    <div className="text2-right">
                    <h1 style={{marginRight:"50px"}}>Ingredients</h1><br/>
                    <h4 className="I-text">
                        We're ruthless about goodness. We have no qualms about tearing
                        up a day-old lettuce leaf (straight from the farm), or steaming
                        a baby (carrot). Cut. Cut. Chop. Chop. Steam. Steam. Stir Stir.
                        While they're still young and fresh - that's our motto. It makes
                        the kitchen a better place
                    </h4>
                    </div>
                </div>
                </div>
                <div className="card-body">
                <div  className="text2 card-text">
                <div className="text2-right">
                    <h1>Our Chefs</h1><br/>
                    <h4 className="I-text">
                    They make sauces sing and salads dance. They create magic with skill, knowledge, passion, and stirring spoons (among other things). They make goodness so good, it doesn't know what to do with itself. We do though. We send it to you.
                    </h4>
                    </div>
                    <div className="text2-left">
                    {" "}
                    <img
                        src="https://thumb1.shutterstock.com/display_pic_with_logo/2982127/437116033/stock-photo-happy-chef-437116033.jpg"
                        alt=""
                        style={{marginLeft:"50px"}}/>
                    </div>
                    
                </div>
                </div>
                <div className="card-body">
                <div  className="text2 card-text">
                    <div className="text2-left">
                    {" "}
                    <img
                        src="https://thumb9.shutterstock.com/display_pic_with_logo/175989610/669255388/stock-photo-vintage-analog-kitchen-countdown-timer-with-classical-clock-face-and-red-remaining-time-display-669255388.jpg"
                        alt=""
                        style={{marginLeft:"20px"}}/>
                    </div>
                    <div className="text2-right">
                    <h1>45 min delivery</h1><br/><br/>
                    </div>
                </div>
                </div>
            </div>
    </div>
     );
}

export default Body;