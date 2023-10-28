import { useContext } from "react";
import { Context } from "../ContextProvider";
import { baseURL } from "../data.json";

export default function Upload({control}) {
    let { Data } = useContext(Context);
    let [data, setData] = Data;
    let handleDrop = (event) => {
        event.preventDefault();
        const file = event.dataTransfer.files[0];
        console.log(file);

        const formData = new FormData();
        formData.append("file", file);

        fetch(`${baseURL}/upload`, {
            method: "POST",
            body: formData,
        })
        .then((res) => res.json())
        .then((data) => {
            console.log('Data :: ',data);
            let reader = new FileReader();
            reader.readAsText(file);
            reader.onload = function () {
                let contents = reader.result;
                const rows = contents.split("\n").map((row) => row.split(","));
                rows.shift();
                console.log(rows);
                setData({columns:data.response,values:rows})
                control(false)
            }
        }).catch((error) => {
            console.error("There was a problem with the fetch operation:", error);
        });
    };

    const handleDragOver = (event) => {
        event.preventDefault();
    };

    let uploadFile = (e)=>{
        e.preventDefault();
        var fileInput = document.getElementById('fileInput');
        var file = fileInput.files[0];

        if (file) {
            var formData = new FormData();
            formData.append('file', file);
            fetch(baseURL+'/upload', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                console.log('File uploaded successfully:', data);
            })
            .catch(error => {
                console.error('Error uploading file:', error);
            });
            console.log('File uploaded:', file.name);
        } else {
            console.error('No file selected');
        }
    }

  return (
    <div
      className="ml-2 bg-gray-800 text-white w-96 h-96 flex flex-col items-center justify-center rounded-xl border-4 border-gray-700"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
        <button className="block w-full text-xl text-right bg-gray-800 px-4" onClick={(e) => control(false)}>
        X
        </button>
      <img className="block w-24" src="/upload-loop.svg" alt="" />
      <div>Drag file</div>
      <input id="file-input" type="file" name="file"/>
    </div>
  );
}