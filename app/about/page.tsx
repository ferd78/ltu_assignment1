export default function AboutPage(){
    return (
        <div className="min-h-screen px-4 py-8">
            <h1 className="text-2xl font-semibold text-white mb-8 text-center">About</h1>
            
            {/* Student Info */}
            <div className="max-w-md mx-auto bg-tealzero rounded-xl p-6 mb-8">
                <div className="text-white space-y-4">
                    <div>
                        <h2 className="text-lg font-semibold mb-2">Student Name</h2>
                        <p className="text-sm">Felix Ferdinand</p>
                    </div>
                    <div>
                        <h2 className="text-lg font-semibold mb-2">Student ID</h2>
                        <p className="text-sm">22586555</p>
                    </div>
                </div>
            </div>

            {/* YouTube Video Embed */}
            <div className="max-w-2xl mx-auto">
                <div className="relative aspect-video">
                    <iframe
                        src="https://www.youtube.com/embed/EngW7tLk6R8?si=z1KGc_AqtO0i2J9P"
                        title="YouTube video player"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen
                        className="w-full h-full rounded-lg"
                    />
                </div>
            </div>
        </div>
    );
}