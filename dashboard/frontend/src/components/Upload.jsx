import { useContext } from "react";
import { Context } from "../ContextProvider";
import { baseURL } from "../data.json";

export default function Upload() {
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
            // For this example, just log the file details
            console.log('File uploaded:', file.name);
        } else {
            console.error('No file selected');
        }
    }

  return (
    <div
      className="ml-2 bg-gray-800 text-white"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      <img className="block w-24" src="/upload.svg" alt="" />
      <div>Drag file</div>
      <input id="file-input" type="file" name="file"/>
    </div>
  );
}