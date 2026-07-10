export default function AddCard({ setShowModal }: { setShowModal: (show: boolean) => void }) {
    return (<li className="relative">
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 bg-[#D9B98C] rounded-t-full border border-[#4A3B2E]/10 flex items-start justify-center">
            <div className="w-1.5 h-1.5 rounded-full bg-[#FBF6EF] mt-0.5" />
        </div>
        <button
            onClick={() => setShowModal(true)}
            className="w-full h-full bg-[#FBF6EF] border border-dashed border-[#4A3B2E]/30 rounded-2xl p-4 pt-6 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition flex flex-col items-center justify-center"
        >
            <div className="w-full h-32 flex items-center justify-center mb-2">
                <span className="text-5xl text-[#4A3B2E]/30">+</span>
            </div>
            <p className="font-[family-name:var(--font-display)] font-medium text-[#4A3B2E]/50">Add a Jelly</p>
        </button>
    </li>
    );
}