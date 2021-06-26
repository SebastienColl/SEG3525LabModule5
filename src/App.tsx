import React, { useEffect, useRef, useState } from 'react';
import './App.css';
import { Col, Row, Image, Container, Button, Form, CardGroup, Card, Modal, Navbar, Nav, Tooltip, OverlayTrigger } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import "react-datetime/css/react-datetime.css";


import { IoMdBody, IoMdHelpCircle} from "react-icons/io"
import { BsCalendar } from "react-icons/bs"
import { AiFillHeart, AiFillPhone } from "react-icons/ai"
import { RiMentalHealthFill } from 'react-icons/ri'
import { MdPayment } from "react-icons/md"
import { GiSewingNeedle, GiElectric, GiHealthNormal } from "react-icons/gi"
import { FaRegStickyNote } from "react-icons/fa"
import Datetime from 'react-datetime';
import Cards, { Focused } from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';
import 'react-phone-number-input/style.css'

interface AppProps {
}

const App: React.FC<AppProps> = () => {

  const [serviceName, setServiceName] = useState<string>("Veuillez sélectionner un service ci-dessus");
  const [yOffset, setYOffset] = useState<number>(0);
  const [paymentModal, setPaymentModal] = useState<boolean>(false);
  const [total, setTotal] = useState<string>("");
  const [cvc, setCVC] = useState<string>("");
  const [expiry, setExpiry] = useState<string>("");
  const [focus, setFocus] = useState<Focused>("number");
  const [name, setName] = useState<string>("");
  const [number, setNumber] = useState<string>("");
  const [isValidCreditCardNumber, setIsValidCreditCardNumber] = useState<boolean>(true);

  const [isValidPhoneNumber, setIsValidPhoneNumber] = useState<boolean>(true);
  const [phoneNumber, setPhoneNumber] = useState<string>("");

  const [selectedExpert, setSelectedExpert] = useState<string>("Jean Tremblay");

  const servicesRef = useRef(null);
  const appointmentRef = useRef(null);
  const expertsRef = useRef(null);
  const contactUsRef = useRef(null);

  const handleChangePhoneNumber = (e:any) => {
    const regex = /\([0-9]{3}\)\s[0-9]{3}-[0-9]{4}/g;
    if(e.target.value.match(regex)!=null) {
      setIsValidPhoneNumber(true)
    } else {
      setIsValidPhoneNumber(false)
    }
  }
  const handleChangeCreditCardNumber = (e:any) => {
    const regex = /[0-9]{4}\s[0-9]{4}\s[0-9]{4}\s[0-9]{4}/g;
    if(e.target.value.match(regex)!=null) {
      setIsValidCreditCardNumber(true)
    } else {
      setIsValidCreditCardNumber(false)
    }
  }

  const disableDates = (current:any) => {
    if(current._d.getDay() === 0 || current._d.getDay() === 6) {
      return false;
    } else if (selectedExpert === "Jean Tremblay" && (current._d.getDay() === 1 || current._d.getDay() === 2)) {
      return true;
    } else if ((current._d.getDay() === 2 || current._d.getDay() === 3) && selectedExpert === "Nathalie Giroux") {
      return true;
    } else if ((current._d.getDay() === 3 || current._d.getDay() === 4) && selectedExpert === "Jacques Boudreault") {
      return true;
    } else if ((current._d.getDay() === 4 || current._d.getDay() === 5) && selectedExpert === "Jeanne Houde") {
      return true;
    } else if ((current._d.getDay() === 2 || current._d.getDay() === 3 || current._d.getDay() === 4) && selectedExpert === "Marie Labelle") {
      return true;
    } else {
      return false;
    }
  }

  
  useEffect(() => {
    window.addEventListener("scroll", () => setYOffset(window.pageYOffset));
    
}, []);

  const scrollTo = (view:any) => {
    view.current.scrollIntoView();
  }
  return (
    <>
      <Navbar fixed="top" bg="light" variant="light">
          <Nav className="mr-auto">
            <Nav.Link className="first-nav" onClick={() => scrollTo(servicesRef)}>Services Offerts</Nav.Link>
            <Nav.Link onClick={() => scrollTo(appointmentRef)}>Rendez-vous</Nav.Link>
            <Nav.Link onClick={() => scrollTo(expertsRef)}>Nos experts</Nav.Link>
            <Nav.Link onClick={() => scrollTo(contactUsRef)}>Nous Joindre</Nav.Link>
          </Nav>
      </Navbar>
      <Col className="pt-5">
        {/* Header */}
        <Row className="py-3 lb-back">
          <img
            alt="Logo"
            className={yOffset > 70 ? "img-fluid sticky-logo fadeIn" : "img-fluid sticky-logo fadeOut" }
            src="https://six08health.com/wp-content/uploads/2021/05/Physiotherapy.png"/>
            <img
            alt="Logo"
            className={yOffset < 70 ? "img-fluid regular-logo fadeIn" : "img-fluid regular-logo fadeOut" }
            src="https://six08health.com/wp-content/uploads/2021/05/Physiotherapy.png"/>
          <h1 className="header ml-auto mr-auto mt-auto mb-auto">Physiothérapie uOttawa</h1>
        </Row>
        {/* Services */}
        <Row ref={servicesRef} className="py-3">
          <Col className="px-5">
            <Row>
                <h1><u>Services offerts <AiFillHeart/></u></h1>
            </Row>
            <Row className="py-4">
              <Col>
                <Row className="d-flex justify-content-center">
                  <IoMdBody size={116} />
                </Row>
                <Row className="d-flex justify-content-center  text-center">
                  Massages physiques thérapeutiques complets <br/>
                  (125$ par session)
                </Row>
                <Row className="d-flex justify-content-center mt-2">
                  <Button variant="info" onClick={() => {
                    setServiceName("Massages physiques thérapeutiques complets");
                    setTotal("125$")}}>
                    Sélectionner
                  </Button>
                </Row>
              </Col>
              <Col>
                <Row className="d-flex justify-content-center">
                  <FaRegStickyNote size={116} />
                </Row>
                <Row className="d-flex justify-content-center text-center">
                  Consultation avec un expert en physiothérapie<br/>
                  (50$ par session)
                </Row>
                <Row className="d-flex justify-content-center mt-2">
                  <Button variant="info" onClick={() => {
                    setServiceName("Consultation avec un expert en physiothérapie");
                    setTotal("50$")
                    }}>
                    Sélectionner
                  </Button>
                </Row>
              </Col>
              <Col>
                <Row className="d-flex justify-content-center">
                  <GiSewingNeedle size={116} />
                </Row>
                <Row className="d-flex justify-content-center text-center">
                  Traitement d'acupuncture <br/>
                  (5 sessions, 160$/session)
                </Row>
                <Row className="d-flex justify-content-center mt-2">
                  <Button variant="info" onClick={() => {
                    setServiceName("Traitement d'acupuncture");
                    setTotal("800$");
                    }}>
                    Sélectionner
                  </Button>
                </Row>
              </Col>
              <Col>
                <Row className="d-flex justify-content-center">
                  <GiElectric size={116} />
                </Row>
                <Row className="d-flex justify-content-center text-center">
                  Stimulation électrique fonctionnelle <br/>
                  (3 sessions, 100$/session)
                </Row>
                <Row className="d-flex justify-content-center mt-2">
                  <Button variant="info" onClick={() => {
                    setServiceName("Stimulation électrique fonctionnelle");
                    setTotal("300$");
                    }}>
                    Sélectionner
                  </Button>
                </Row>
              </Col>
              <Col>
                <Row className="d-flex justify-content-center">
                  <GiHealthNormal size={116} />
                </Row>
                <Row className="d-flex justify-content-center text-center">
                  Restauration de la santé pelvienne <br/>
                  (10 sessions, 250$/session)
                </Row>
                <Row className="d-flex justify-content-center mt-2">
                  <Button variant="info" onClick={() => {
                    setServiceName("Restauration de la santé pelvienne");
                    setTotal("2500$")
                    }}>
                    Sélectionner
                  </Button>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
        {/* Appointment */}
        <Row ref={appointmentRef} className="py-3 lb-back">
          <Col className="px-5">
            <Row>
                <h1><u>Rendez-vous <BsCalendar/></u></h1>
            </Row>
            <Row className="py-4">
              <Col className="w-25">
                <h4>Informations de contact</h4>
                <Form>
                  <Form.Group>
                    <Form.Label>Prénom</Form.Label>
                    <Form.Control type="text" />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Nom</Form.Label>
                    <Form.Control type="text" />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Numéro de téléphone</Form.Label>
                    <Form.Control type="text" onChange={(e:any) => handleChangePhoneNumber(e)}/>
                    {!isValidPhoneNumber && <p className="text-danger">Veuillez entrer un numéro de téléphone valide (eg: <b>(xxx) xxx-xxxx</b>)</p>}
                  </Form.Group>
                </Form>
                <Button onClick={() => {
                  if(serviceName === "Veuillez sélectionner un service ci-dessus") {
                    window.alert("Veuillez sélectionner un service avant de passer au paiement.");
                  } else {
                    setPaymentModal(!paymentModal);
                  }
                }}>Passer au paiement<MdPayment/></Button>
                <Modal show={paymentModal}>
                  <Modal.Header>
                    <Modal.Title>Paiement<MdPayment/></Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <Cards
                      cvc={cvc}
                      expiry={expiry}
                      focused={focus}
                      name={name}
                      number={number}
                    />
                    <Form>
                      <Form.Group>
                        <Form.Label>Numéro de carte</Form.Label>
                        <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">La carte de crédit est requise en cas de "no show".</Tooltip>}>
                          <span className="d-inline-block">
                            <IoMdHelpCircle style={{ pointerEvents: 'none' }}/>
                          </span>
                        </OverlayTrigger>
                        <Form.Control
                        name="number"
                        type="tel"
                        maxLength={19}
                        onChange={(e:any) => {setNumber(e.target.value); handleChangeCreditCardNumber(e)}}
                        onFocus={(e:any) => {setFocus(e.target.name)}}
                        placeholder="Numéro de carte (ex: 1234 5678 9012 3456)" />
                      </Form.Group>
                      {!isValidCreditCardNumber && <p className="text-danger">Veuillez entrer un numéro de téléphone valide (eg: <b>xxxx xxxx xxxx xxxx</b>)</p>}

                      <Form.Group>
                        <Form.Label>Nom sur la carte</Form.Label>
                        <Form.Control
                        name="name"
                        type="text"
                        onChange={(e:any) => {setName(e.target.value)}}
                        onFocus={(e:any) => {setFocus(e.target.name)}}
                        placeholder="Nom sur la carte" />
                      </Form.Group>
                      <Form.Group>
                        <Form.Label>Date d'expiration</Form.Label>
                        <Form.Control
                        name="expiry"
                        type="text"
                        onChange={(e:any) => {setExpiry(e.target.value)}}
                        onFocus={(e:any) => {setFocus(e.target.name)}}
                        placeholder="Date d'expiration (ex: 05/23)" />
                      </Form.Group>
                      <Form.Group>
                        <Form.Label>CVC</Form.Label>
                        <Form.Control
                        name="cvc"
                        type="text"
                        onChange={(e:any) => {setCVC(e.target.value)}}
                        onFocus={(e:any) => {setFocus(e.target.name)}}
                        placeholder="CVC (ex: 123)" />
                      </Form.Group>
                    </Form>
                    <hr/>
                    <h5>Total: {total}</h5>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={() => {
                      setPaymentModal(!paymentModal)
                      setNumber("");
                      setCVC("");
                      setExpiry("");
                      setName("");
                      setFocus("number");
                      }}>
                      Annuler
                    </Button>
                    <Button variant="primary" onClick={() => {
                      setPaymentModal(!paymentModal)
                      setNumber("");
                      setCVC("");
                      setExpiry("");
                      setName("");
                      setFocus("number");
                      }}>
                      Passer le paiement
                    </Button>
                  </Modal.Footer>
                </Modal>
              </Col>
              <Col className="w-25">
                <h4>Service</h4>
                <Form.Group>
                  <Form.Label>Service sélectionné</Form.Label>
                  <Form.Control type="text" placeholder={serviceName} readOnly />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Expert désiré</Form.Label>
                  <Form.Control as="select" onChange={(e:any) => {
                    setSelectedExpert(e.target.value)
                  }}>
                    <option value="Jean Tremblay">Jean Tremblay</option>
                    <option value="Nathalie Giroux">Nathalie Giroux</option>
                    <option value="Jacques Boudreault">Jacques Boudreault</option>
                    <option value="Jeanne Houde">Jeanne Houde</option>
                    <option value="Marie Labelle">Marie Labelle</option>
                  </Form.Control>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Date et heure</Form.Label>
                  <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Les dates disponibles sont choisies en conséquence de l'expert séléctionné.</Tooltip>}>
                          <span className="d-inline-block">
                            <IoMdHelpCircle style={{ pointerEvents: 'none' }}/>
                          </span>
                        </OverlayTrigger>
                  <Datetime isValidDate={disableDates} />
                </Form.Group>
              </Col>
            </Row>
          </Col>
        </Row>
        {/* Experts */}
        <Row ref={expertsRef} className="py-3">
          <Col className="px-5">
            <Row>
                <h1><u>Nos experts <RiMentalHealthFill/> </u></h1>
            </Row>
            <Row className="py-4">
              <Col>
                <Card>
                  <Card.Img className="zoomOnHover" variant="top" src="https://healthtimes.com.au/administrator/uploads/article_images/How%20to%20become%20a%20phys1593396238.jpg" />
                  <Card.Body>
                    Jean Tremblay
                    <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Disponible le lundi et mardi</Tooltip>}>
                      <span className="d-inline-block">
                        <IoMdHelpCircle style={{ pointerEvents: 'none' }}/>
                      </span>
                    </OverlayTrigger>
                    <br/>
                    Expert en traitement d'acupuncture
                  </Card.Body>
                </Card>
              </Col>
              <Col>
                <Card>
                  <Card.Img className="zoomOnHover" variant="top" src="https://cornerstonephysio.com/wp-content/uploads/2017/10/Cornerstone11Nov16_207-1-scaled-e1595075721435.jpg" />
                  <Card.Body>
                    Nathalie Giroux
                    <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Disponible le mardi et mercredi</Tooltip>}>
                      <span className="d-inline-block">
                        <IoMdHelpCircle style={{ pointerEvents: 'none' }}/>
                      </span>
                    </OverlayTrigger>
                    <br/>
                    Experte en massage de thérapies physiques<br/>
                  </Card.Body>
                </Card>
              </Col>
              <Col>
                <Card>
                  <Card.Img className="zoomOnHover" variant="top" src="https://healthtimes.com.au/administrator/uploads/article_images/Physiotherapist1619405188.jpg" />
                  <Card.Body>
                    Jacques Boudreault
                    <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Disponible le mercredi et jeudi</Tooltip>}>
                      <span className="d-inline-block">
                        <IoMdHelpCircle style={{ pointerEvents: 'none' }}/>
                      </span>
                    </OverlayTrigger>
                    <br/>
                    Expert en traitement de stimulation électrique
                  </Card.Body>
                </Card>
              </Col>
              <Col>
                <Card>
                  <Card.Img className="zoomOnHover" variant="top" src="https://previews.123rf.com/images/antoniodiaz/antoniodiaz1808/antoniodiaz180800713/107379511-female-physiotherapy-professional-massaging-patient-s-foot-in-clinic.jpg" />
                  <Card.Body>
                    Jeanne Houde
                    <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Disponible le jeudi et vendredi</Tooltip>}>
                      <span className="d-inline-block">
                        <IoMdHelpCircle style={{ pointerEvents: 'none' }}/>
                      </span>
                    </OverlayTrigger>
                    <br/>
                    Experte en consultation
                  </Card.Body>
                </Card>
              </Col>
              <Col>
                <Card>
                  <Card.Img className="zoomOnHover" variant="top" src="https://images0.westend61.de/0001412971pw/portrait-of-female-physiotherapist-ABZF03273.jpg" />
                  <Card.Body>
                    Marie Labelle 
                    <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Disponible le mardi, mercredi et jeudi</Tooltip>}>
                      <span className="d-inline-block">
                        <IoMdHelpCircle style={{ pointerEvents: 'none' }}/>
                      </span>
                    </OverlayTrigger>
                    <br/>
                    Experte en restauration de la santé pelvienne
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>
        {/* Contact us */}
        <Row ref={contactUsRef} className="lb-back py-3">
          <Col className="px-5">
            <Row>
              <h1><u>Nous Joindre <AiFillPhone/></u></h1>
            </Row>
            <Row className="py-4">
              <Col>
                <h5>
                1065 Plains Road East <br/>
                Burlington ON <br/>
                L7T 4K1 <br/>
                </h5>
              </Col>
              <Col>
                <h5>
                Tel: 819-986-6958 <br/>
                Fax: 613-968-8752 <br/>
                Email: info@physiotherapieuottawa.ca <br/>
                </h5>
              </Col>
            </Row>
          </Col>
        </Row>
      </Col>
    </>
  );
}

export default App;
