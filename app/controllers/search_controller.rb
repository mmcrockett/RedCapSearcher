require 'RedcapAPI'

class SearchController < ApplicationController
  def index
    token = params[:token]
    url   = params[:url]

    respond_to do |format|
      if ((nil != url) && (nil != token))
        begin
          redcap = RedcapAPI.new(token, url)
          metadata = redcap.export_metadata()
          data     = redcap.export()
          output   = {:metadata => metadata, :data => data}
        rescue => e
          format.json { render :json => "Unable to process values! Actual message '#{e}'", :status => :unprocessable_entity }
        end

        format.html { }
        format.json { render :json => output }
      else
        format.html { }
        format.json { render :json => "Invalid values for token or url!", :status => :unprocessable_entity }
      end
    end
  end
end
