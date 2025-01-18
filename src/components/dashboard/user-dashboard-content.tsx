'use client'

export function UserDashboardContent() {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white/5 rounded-xl p-6 backdrop-blur-sm border border-white/10">
          <h3 className="text-lg font-medium text-white mb-2">Witness Tokens</h3>
          <p className="text-3xl font-bold text-blue-400">0</p>
        </div>
        <div className="bg-white/5 rounded-xl p-6 backdrop-blur-sm border border-white/10">
          <h3 className="text-lg font-medium text-white mb-2">Raffle Entries</h3>
          <p className="text-3xl font-bold text-blue-400">0</p>
        </div>
        <div className="bg-white/5 rounded-xl p-6 backdrop-blur-sm border border-white/10">
          <h3 className="text-lg font-medium text-white mb-2">NFTs Owned</h3>
          <p className="text-3xl font-bold text-blue-400">0</p>
        </div>
      </div>

      {/* Animal Perspectives */}
      <div className="bg-white/5 rounded-xl p-6 backdrop-blur-sm border border-white/10 mb-8">
        <h2 className="text-xl font-bold text-white mb-4">Animal Perspectives</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {['Wolf', 'Rabbit', 'Wisp', 'Pilot'].map((animal) => (
            <div key={animal} className="bg-black/50 rounded-lg p-4 border border-white/5">
              <div className="aspect-square rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-500/20 mb-4 flex items-center justify-center">
                <span className="text-4xl">🔒</span>
              </div>
              <h3 className="text-lg font-medium text-white mb-1">{animal}</h3>
              <p className="text-sm text-neutral-400">Unlock this perspective</p>
              <button className="mt-4 w-full py-2 rounded-lg bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 transition-colors text-sm font-medium">
                View in Marketplace
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Raffle */}
      <div className="bg-white/5 rounded-xl p-6 backdrop-blur-sm border border-white/10">
        <h2 className="text-xl font-bold text-white mb-4">Current Raffle</h2>
        <div className="text-center py-8">
          <p className="text-neutral-400 mb-4">Use your Witness Tokens to increase your chances!</p>
          <button className="px-6 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors text-sm font-medium">
            Enter Raffle
          </button>
        </div>
      </div>
    </div>
  )
}
