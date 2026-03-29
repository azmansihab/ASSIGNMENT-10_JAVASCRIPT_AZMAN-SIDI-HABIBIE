let dataDummy = JSON.parse(localStorage.getItem("rnu_data")) || [
    { id: 1, title: "Data Banjir", body: "Analisis spasial kejadian banjir periode 2025." },
    { id: 2, title: "Data Longsor", body: "Peta risiko bencana wilayah lereng Jakarta." }
];

const postForm = document.getElementById("postForm");
const postList = document.getElementById("postList");
const formTitle = document.getElementById("formTitle");
const submitBtn = document.getElementById("submitBtn");
const cancelBtn = document.getElementById("cancelBtn");

function renderData() {
    postList.innerHTML = "";
    dataDummy.forEach((item) => {
        postList.innerHTML += `
            <div class="col-md-12">
                <div class="card bg-brand-orange border-0 shadow p-3 text-white">
                    <h4 class="fw-bold">${item.title}</h4>
                    <p class="small opacity-75">${item.body}</p>
                    <div class="d-flex gap-2">
                        <button onclick="editData(${item.id})" class="btn btn-sm btn-dark">
                            <i class="fas fa-edit"></i> Edit
                        </button>
                        <button onclick="deleteData(${item.id})" class="btn btn-sm btn-danger">
                            <i class="fas fa-trash"></i> Delete
                        </button>
                    </div>
                </div>
            </div>
        `;
    });
    localStorage.setItem("rnu_data", JSON.stringify(dataDummy));
}

postForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const id = document.getElementById("postId").value;
    const title = document.getElementById("title").value;
    const body = document.getElementById("body").value;

    if (id) {
        dataDummy = dataDummy.map(item =>
            item.id == id ? { ...item, title, body } : item
        );
        resetForm();
    } else {
        const newData = {
            id: Date.now(),
            title,
            body
        };
        dataDummy.push(newData);
    }

    renderData();
    postForm.reset();
});

function editData(id) {
    const item = dataDummy.find(d => d.id === id);
    if (item) {
        document.getElementById("postId").value = item.id;
        document.getElementById("title").value = item.title;
        document.getElementById("body").value = item.body;

        formTitle.innerText = "Edit Post";
        submitBtn.innerText = "Perbarui Data";
        cancelBtn.classList.remove("d-none");
        window.scrollTo(0, 0);
    }
}

function deleteData(id) {
    if (confirm("Apakah Anda yakin ingin menghapus data ini?")) {
        dataDummy = dataDummy.filter(item => item.id !== id);
        renderData();
    }
}

function resetForm() {
    document.getElementById("postId").value = "";
    formTitle.innerText = "Tambah Post";
    submitBtn.innerText = "Simpan Data";
    cancelBtn.classList.add("d-none");
    postForm.reset();
}

cancelBtn.addEventListener("click", resetForm);

renderData();