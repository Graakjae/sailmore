import { addDoc } from "@firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { favsRef } from "../firebase-config";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import da from 'date-fns/locale/da';
import Select from 'react-select';

import imgPlaceholder from "../assets/img/boat-placeholder.png";
import rudder from "../assets/img/rudder.png";
import location from "../assets/img/locationicon.png";
import boat from "../assets/img/boaticon.png";
import calender from "../assets/img/calendericon.png";
import coins from "../assets/img/coinsicon.png";
import arrow from "../assets/img/arrow.png";
import logo from "../assets/img/logo.png";


export default function NewFavList({ showLoader }) {
    const [posts, setPosts] = useState([]);
    const [datas, setDatas] = useState([]);
    const [selectedAktiviteter, setSelectedAktiviteter] = useState([]);
    
    const [name, setName] = useState("");
    const [beskrivelse, setBeskrivelse] = useState("");
    const [sejlområde, setSejlområde] = useState({});
    const [erfaring, setErfaring] = useState({});
    const [pris, setPris] = useState("");
    const [image, setImage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    const navigate = useNavigate();

    const alleAktiviteter = [
        {
          value: 0,
          label: "Besøge seværdigheder"
        },
        {
          value: 1,
          label: "Bjergvandring"
        },
        {
          value: 2,
          label: "Dykke med flasker"
        },
        {
          value: 3,
          label: "Dykke med snorkel"
        },
        {
          value: 4,
          label: "Fiske med fiskestang"
        },
        {
          value: 5,
          label: "Historisk interesseret"
        },
        {
          value: 6,
          label: "Kulturelt interesseret"
        },
        {
          value: 7,
          label: "Lære at dykke med flasker"
        },
        {
          value: 8,
          label: "Lære at navigere"
        },
        {
          value: 9,
          label: "Lære at sejle"
        },
        {
          value: 10,
          label: "Undervandsjagt med harpun"
        },
        {
          value: 11,
          label: "Vandreture"
        }
      ];

    useEffect(() => {
        async function getPosts() {
            const url = "https://api.jsonbin.io/b/628ca823402a5b38020b1aff";
            const response = await fetch(url);
            const data = await response.json();
            setPosts(data);
            console.log(data);
            showLoader(false);
            
        }
        getPosts();
    }, [showLoader]);

    useEffect(() => {
        async function getData() {
            const url1 = "https://api.jsonbin.io/b/628f8a72402a5b38020eb42c";
            const response1 = await fetch(url1);
            const data1 = await response1.json();
            setDatas(data1);
            console.log(data1);
            showLoader(false);
            
        }
        getData();
    }, [showLoader]);
    
    async function handleSubmit(event) {
        event.preventDefault();

        const newFavList = {
            name: name,
            beskrivelse: beskrivelse,
            image: image,
            sejlområde: sejlområde,
            erfaring: erfaring,
            pris: pris,
            startDate: startDate,
            endDate: endDate,
            selectedAktiviteter: selectedAktiviteter    
        };

        await addDoc(favsRef, newFavList);
        navigate("/dinetogter");
    }

    function handleImageChange(event) {
        const file = event.target.files[0];
        if (file.size < 500000) {
            // image file size must be below 0,5MB
            const reader = new FileReader();
            reader.onload = event => {
                setImage(event.target.result);
            };
            reader.readAsDataURL(file);
            setErrorMessage(""); // reset errorMessage state
        } else {
            // if not below 0.5MB display an error message using the errorMessage state
            setErrorMessage("Billedet er for stort");
        }
    }

    
    function handleActivitiesChange(selectedOptions) {
        console.log(`Option selected:`, selectedOptions);
        setSelectedAktiviteter(selectedOptions);
    }


    return (
        <section className="page">
            <button className="buttonback" onClick={() => navigate(-1)}>
                <img src={arrow} alt="arrow" className="arrow"/>
            </button> 
                <img src={logo} alt="logo" className="logo"/>
        
            <form onSubmit={handleSubmit}>
            
                <label>
                    Navngiv din sejlads
                    <input type="text" onChange={e => setName(e.target.value)} />
                </label>

                <label>
                    Beskrivelse
                    <textarea className="beskrivelse" type="text" onChange={e => setBeskrivelse(e.target.value)} />
                </label>
                
                <label>
                    Pris per dag
                    <img src={coins} alt="coins icon" className="icons"/>
                    <input type="number" onChange={e => setPris(e.target.value)} />
                </label>

                <label className="flexbox2">  
                    <div>
                        Startdato
                        <img src={calender} alt="calender icon" className="icons"/>
                        <DatePicker locale={da} dateFormat="dd/MM/yyyy" className="dates" selected={startDate} onChange={(e) => setStartDate(e)} />
                    </div>
                    <div>
                        Slutdato
                        <img src={calender} alt="calender icon" className="icons"/>
                        <DatePicker locale={da} dateFormat="dd/MM/yyyy" className="dates" selected={endDate} onChange={(e) => setEndDate(e)} />
                    </div>
                </label>
                <label >
                        Vælg sejlområde
                        <img src={location} alt="location icon" className="icons"/>
                        <select onChange={e => setSejlområde(e.target.value)}>
                            <option>Sejlområde</option>
                            {posts.map(post => (
                                <option value={post.name} key={post.name}>
                                    {post.name}
                                </option>
                            ))}
                        </select>
                        
                </label>
                <label>
                        Aktiviteter
                        <img src={boat} alt="boat icon" className="icons"/>

                        <Select
                            isMulti
                            name="colors"
                            options={alleAktiviteter}
                            className="basic-multi-select"
                            classNamePrefix="Aktiviteter"
                            onChange={handleActivitiesChange}
                            closeMenuOnSelect={false}
                        />
                </label>
                <label>
                        Vælg erfaring
                        <img src={rudder} alt="rudder icon" className="icons"/>
                        <select onChange={e => setErfaring(e.target.value)}>
                            <option>Erfaring</option>
                            {datas.map(data => (
                                <option value={data.erfaring} key={data.erfaring}>
                                    {data.erfaring}
                                </option>
                            ))}
                        </select>
                </label>
                <label>
                    Vælg et billede
                    <input type="file" className="file-input" accept="image/*" onChange={handleImageChange} />
                    <img className="image-preview" src={image} alt="Choose" onError={e => (e.target.src = imgPlaceholder)} />
                </label>
                <p>{errorMessage}</p>
                <button type="submit">Opret togt</button>
                
            </form>
        </section>
    );
}